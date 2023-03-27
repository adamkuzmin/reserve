import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

import { exampleValues } from "@/Components/Admin/project/__data";
import groq from "groq";
import { sanity } from "@/Components/Client/sanity/sanity-client";
import PartnerPage from ".";

const PartnerPID = () => {
  const router = useRouter();
  const { query, isReady } = router;
  const { pid } = query;

  const [values, setValues] = useState();
  const [cats, setCats] = useState();

  const [isFetched, setFetched] = useState(false);

  useEffect(() => {
    if (isReady && pid) {
      const query = groq`
      *[_type == "partners" && _id == "${pid}"] {
        _id,
        name,
        review,
        cr,
        location
      }
      `;

      sanity
        .fetch(query)
        .then((data) => {
          setValues(data);
          setFetched(true);
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
      if (values.length > 0) return values[0];
      return {};
    }
    return null;
  }, [isFetched, values]);

  if (!(pid && isReady && values && isFetched && mode && initialValues))
    return <></>;

  return (
    <PartnerPage
      cats={cats}
      id={pid}
      mode={mode}
      initialValues={initialValues}
    />
  );
};

export default PartnerPID;
