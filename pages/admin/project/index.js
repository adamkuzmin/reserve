import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { Button, Form, Upload } from "antd";
import { useEffect, useState } from "react";
import AdminWrapper from "../../../Components/Admin/admin-wrapper/admin-wrapper";
import Common from "../../../Components/Admin/project/a-common/common";
import Editor from "../../../Components/Admin/project/b-editor/editor";
import Nav from "../../../Components/Admin/project/nav/nav";
import client from "../../../Components/Client/apollo/apollo-client";
import { Content } from "../../../Components/common/body";
import ProjectHeader from "../../../Components/ProjectInfo/ProjectHeader";

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

  const [section, setSection] = useState("common");

  return (
    <>
      <AdminWrapper panel={<Nav {...{ section, setSection }} />}>
        {section === "common" ? <Common /> : <Editor />}
      </AdminWrapper>
    </>
  );
};

export default ProjectsPage;
