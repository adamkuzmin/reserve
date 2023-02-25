import { GET_PROJECT } from "@/Components/Admin/project/__queries";
import { useLazyQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import Project from "./Project";
import client from "@/Components/Client/apollo/apollo-client";
import { sanity } from "@/Components/Client/sanity/sanity-client";
import groq from "groq";
import {
  projectFields,
  projectFields_mini,
} from "@/Components/Admin/queries/__queries";

const ProjectPage = () => {
  const router = useRouter();
  const { query, isReady } = router;
  const { pid } = query;

  const [values, setValues] = useState();
  const [isFetched, setFetched] = useState(false);

  const [beforeAfter, setBeforeAfter] = useState();
  const [isBAFetched, setBAFecthed] = useState(false);

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

      /* */

      const query_ba = groq`
      *[_type == "projects"] {
        ${projectFields_mini}
      }
      `;

      sanity
        .fetch(query_ba)
        .then((data) => {
          if (data && data.length > 0) {
            const index = data.findIndex(({ _id }) => _id === pid);

            if (index >= 0) {
              let beforeIndex = index === 0 ? data.length - 1 : index - 1;
              let nextIndex = index === data.length - 1 ? 0 : index + 1;

              const before = data[beforeIndex];
              const next = data[nextIndex];

              setBeforeAfter([before, next]);
              setBAFecthed(true);
            }
          }
        })
        .catch(() => setBAFecthed(true));
    }
  }, [isReady, pid]);

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
      isFetched &&
      isBAFetched &&
      beforeAfter &&
      initialValues
    )
  )
    return <></>;

  return (
    <div>
      <Project {...{ initialValues, beforeAfter, pid }} />
    </div>
  );
};

export default ProjectPage;
