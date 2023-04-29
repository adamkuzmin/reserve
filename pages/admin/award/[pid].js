import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { AwardsRefQuery } from "@/Components/Admin/queries/__queries";

import groq from "groq";
import { sanity } from "@/Components/Client/sanity/sanity-client";
import AwardPage from ".";
import { useStore } from "@/Store/useStore";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

const AwardPID = () => {
  const router = useRouter();
  const { query, isReady } = router;
  const { pid } = query;

  const [values, setValues] = useState();

  const logId = useStore(({ logId }) => logId);
  const setLogId = useStore(({ setLogId }) => setLogId);
  const [isFetched, setFetched] = useState(false);

  const [formLogId, setFormLogId] = useState(uuidv4());

  const forceAction = (action = () => {}, props) => {
    action(props);
  };

  useEffect(() => {
    if (isReady && pid) {
      const query = groq`
      *[ _type == "awards" && _id == "${pid}" ] {
        _id,
        cover,
        year,
        cr,
        awards_refs
      }[0]
    `;

      sanity
        .fetch(query)
        .then((data) => {
          setValues(data);
          setFetched(true);
          setFormLogId(uuidv4());

          forceAction(data);
        })
        .catch(() => setFetched(true));

      sanity
        .fetch(AwardsRefQuery)
        .then((data) => {})
        .catch(() => setFetched(true));
    }
  }, [isReady, pid, logId]);

  const mode = useMemo(() => {
    if (isFetched) {
      if (values) return "edit";
      return "new";
    }
    return null;
  }, [values, isFetched, logId]);

  const initialValues = useMemo(() => {
    if (isFetched) {
      if (values) return values;
      return {};
    }
    return null;
  }, [isFetched, values, logId]);

  useEffect(() => {
    const createAward = async () => {
      const data = { cr: moment().toISOString(), _type: "awards" };

      try {
        let award = await sanity.create(data);

        router.push(`/admin/award/${award._id}`, null, { shallow: true });
        setLogId();
      } catch (err) {}
    };

    if (mode === "new") {
      createAward();
    }
  }, [mode]);

  if (!(pid && isReady && isFetched && mode && mode !== "new" && initialValues))
    return <></>;

  return (
    <AwardPage
      id={pid}
      mode={mode}
      {...{ formLogId }}
      initialValues={initialValues}
    />
  );
};

export default AwardPID;
