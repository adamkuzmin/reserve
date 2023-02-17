import { GET_PROJECT } from "@/Components/Admin/project/__queries";
import { useLazyQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import Project from "./Project";
import client from "@/Components/Client/apollo/apollo-client";

const ProjectPage = () => {
  const router = useRouter();
  const { query, isReady } = router;
  const { pid } = query;

  /* Найти проект */
  const [getProject, { data, loading, error }] = useLazyQuery(GET_PROJECT, {
    client,
    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    getProject({
      variables: { project_id: pid },
    });
  }, [isReady, pid]);

  const initialValues = useMemo(() => {
    if (data) {
      const { tiger_data_r_pr_hub_by_pk: a } = data;
      if (a) return a;
    }
    return null;
  });

  if (!(pid && isReady && !loading && initialValues)) return <></>;

  return (
    <div>
      <Project {...{ initialValues, pid }} />
    </div>
  );
};

export default ProjectPage;
