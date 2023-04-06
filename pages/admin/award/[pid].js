import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { AwardsRefQuery } from "@/Components/Admin/queries/__queries";

import groq from "groq";
import { sanity } from "@/Components/Client/sanity/sanity-client";
import AwardPage from ".";

const AwardPID = () => {
  const router = useRouter();
  const { query, isReady } = router;
  const { pid } = query;

  const [values, setValues] = useState();

  const [isFetched, setFetched] = useState(false);

  useEffect(() => {
    if (isReady && pid) {
      const query = groq`
      *[ _type == "awards" && _id == "${pid}" ] {
        _id,
        cover,
        year,
        cr,
        awards_refs[]->{
          _id,
          cover,
          project->{
            _id,
            name
          }
        }
      }[0]
    `;

      sanity
        .fetch(query)
        .then((data) => {
          console.log("data", data);

          setValues(data);
          setFetched(true);
        })
        .catch(() => setFetched(true));

      sanity
        .fetch(AwardsRefQuery)
        .then((data) => {
          console.log("data1", data);
        })
        .catch(() => setFetched(true));
    }
  }, [isReady, pid]);

  const mode = useMemo(() => {
    if (isFetched) {
      if (values && values.length > 0) return "edit";
      return "new";
    }
    return null;
  }, [values, isFetched]);

  const initialValues = useMemo(() => {
    if (isFetched) {
      if (values) return values;
      return {};
    }
    return null;
  }, [isFetched, values]);

  if (!(pid && isReady && values && isFetched && mode && initialValues))
    return <></>;

  return <AwardPage id={pid} mode={mode} initialValues={initialValues} />;
};

export default AwardPID;
