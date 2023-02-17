import { useRouter } from "next/router";
import client from "@/Components/Client/apollo/apollo-client";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { useEffect, useMemo } from "react";
import ProjectPage from ".";

import { GET_PROJECT, CATS } from "@/Components/Admin/project/__queries";
import { exampleValues } from "@/Components/Admin/project/__data";

const ProjectPID = () => {
  const router = useRouter();
  const { query, isReady } = router;
  const { pid } = query;

  /* Найти проект */
  const [getProject, { data, error }] = useLazyQuery(GET_PROJECT, {
    client,
    fetchPolicy: "no-cache",
  });

  console.log("error", error);

  useEffect(() => {
    getProject({
      variables: { project_id: pid },
    });
  }, [isReady, pid]);

  const mode = useMemo(() => {
    if (data) {
      const { tiger_data_r_pr_hub_by_pk: a } = data;
      if (a) return "edit";
      return "new";
    }
    return null;
  }, [data]);

  const initialValues = useMemo(() => {
    if (data) {
      const { tiger_data_r_pr_hub_by_pk: a } = data;
      if (a) return a;
      return exampleValues;
    }
    return null;
  });

  /* Найти категории */
  const { data: catsData, loading } = useQuery(CATS, { client });
  const cats = useMemo(() => {
    if (catsData) {
      const { tiger_data_r_cat_hub = [] } = catsData;
      return tiger_data_r_cat_hub;
    }
  }, [catsData]);

  if (!(pid && isReady && data && !loading && cats && mode && initialValues))
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
