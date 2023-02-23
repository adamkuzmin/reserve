import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import ProjectPage from ".";

import { exampleValues } from "@/Components/Admin/project/__data";
import groq from "groq";
import {
  catsFields,
  projectFields,
} from "@/Components/Admin/queries/__queries";
import { sanity } from "@/Components/Client/sanity/sanity-client";

const ProjectPID = () => {
  const router = useRouter();
  const { query, isReady } = router;
  const { pid } = query;

  const [values, setValues] = useState();
  const [cats, setCats] = useState();

  const [isFetched, setFetched] = useState(false);
  const [isCatsFetched, setCatsFetched] = useState(false);

  useEffect(() => {
    if (isReady && pid) {
      const query = groq`
      *[_type == "projects" && _id == "${pid}"] {
        ${projectFields}
      }
      `;

      const catsQuery = groq`
      *[_type == "categories"] {
        ${catsFields}
      }
      `;

      sanity
        .fetch(query)
        .then((data) => {
          setValues(data);
          setFetched(true);
        })
        .catch(() => setFetched(true));

      sanity
        .fetch(catsQuery)
        .then((data) => {
          setCats(data);
          setCatsFetched(true);
        })
        .catch(() => setCatsFetched(true));
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
      return exampleValues;
    }
    return null;
  }, [isFetched, values]);

  if (
    !(
      pid &&
      isReady &&
      values &&
      isFetched &&
      isCatsFetched &&
      cats &&
      mode &&
      initialValues
    )
  )
    return <></>;

  return (
    <ProjectPage
      cats={cats}
      id={pid}
      mode={mode}
      initialValues={initialValues}
    />
  );
};

export default ProjectPID;
