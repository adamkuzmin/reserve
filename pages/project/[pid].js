import { GET_PROJECT } from "@/Components/Admin/project/__queries";
import { useLazyQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import Project from "./Project";
import client from "@/Components/Client/apollo/apollo-client";
import { sanity } from "@/Components/Client/sanity/sanity-client";
import groq from "groq";
import { projectFields } from "@/Components/Admin/queries/__queries";

const ProjectPage = () => {
  const router = useRouter();
  const { query, isReady } = router;
  const { pid } = query;

  const [values, setValues] = useState();
  const [isFetched, setFetched] = useState(false);

  useEffect(() => {
    if (isReady && pid) {
      const query = groq`
      *[_type == "projects" && _id == "${pid}"] {
        ${projectFields}
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

  const initialValues = useMemo(() => {
    if (isFetched) {
      if (values.length > 0) return values[0];
      return exampleValues;
    }
    return null;
  }, [isFetched, values]);

  if (!(pid && isReady && isFetched && initialValues)) return <></>;

  return (
    <div>
      <Project {...{ initialValues, pid }} />
    </div>
  );
};

export default ProjectPage;
