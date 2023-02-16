import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { Button } from "antd";
import { useEffect } from "react";
import AdminWrapper from "../../../Components/Admin/admin-wrapper/admin-wrapper";
import client from "../../../Components/Client/apollo/apollo-client";

const getProjectsHub = gql`
  query getProjects {
    tiger_data_r_pr_hub {
      cr
      description
      id
      meta
      name
    }
  }
`;

const ProjectsPage = () => {
  const [getProjects, { data, error }] = useLazyQuery(getProjectsHub, {
    client,
  });

  useEffect(() => {
    getProjects();
  }, []);

  console.log("data", data);

  return (
    <>
      <AdminWrapper>
        <Button>Добавить проект</Button>
      </AdminWrapper>
    </>
  );
};

export default ProjectsPage;
