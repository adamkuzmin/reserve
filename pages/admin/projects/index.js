import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { Button } from "antd";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import AdminWrapper from "../../../Components/Admin/admin-wrapper/admin-wrapper";
import client from "../../../Components/Client/apollo/apollo-client";
import { v4 as uuidv4 } from "uuid";
import { WideButton } from "@/Components/ProjectInfo/ProjectBottom";
import { Text24, Text30 } from "@/Components/common/text";
import Projects from "@/Components/Admin/projects/projects";

export const getProjectsHub = gql`
  query getProjects {
    tiger_data_r_pr_hub {
      id
      address
      cats
      city
      comment
      coverhor
      coververt
      cr
      description
      main_img
      meta
      name
      year
      slider_imgs
      secondary_imgs
    }
  }
`;

const ProjectsPage = () => {
  const router = useRouter();

  const [getProjects, { data, error }] = useLazyQuery(getProjectsHub, {
    client,
  });

  useEffect(() => {
    getProjects();
  }, []);

  const projects = useMemo(() => {
    if (data) {
      const { tiger_data_r_pr_hub: a = [] } = data;

      return a;
    }
  }, [data]);

  return (
    <>
      <AdminWrapper>
        <WideButton
          style={{ width: "550px", height: "75px" }}
          onClick={() =>
            router.push(`/admin/project/${uuidv4()}`, null, { shallow: true })
          }
        >
          <Text30>Добавить проект</Text30>
        </WideButton>

        <br />
        <br />

        {projects && <Projects data={projects} />}
      </AdminWrapper>
    </>
  );
};

export default ProjectsPage;
