import { sanity } from "@/Components/Client/sanity/sanity-client";
import groq from "groq";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import AdminWrapper from "../admin-wrapper/admin-wrapper";
import Project from "./project";

const ProjectWrapper = ({ section = {} }) => {
  const router = useRouter();
  const { query, isReady } = router;
  const { pid } = query;

  const [values, setValues] = useState();
  const [isFetched, setFetched] = useState(false);

  useEffect(() => {
    if (isReady && pid) {
      const query = groq`
      *[_type == "${section.name}" && _id == "${pid}"] {
        _id,
        name,
        cr
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
    <AdminWrapper>
      <Project initialValues={initialValues} section={section} mode={mode} />
    </AdminWrapper>
  );
};

export default ProjectWrapper;
