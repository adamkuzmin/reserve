import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { Button } from "antd";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import AdminWrapper from "../../../Components/Admin/admin-wrapper/admin-wrapper";
import client from "../../../Components/Client/apollo/apollo-client";
import { v4 as uuidv4 } from "uuid";
import { WideButton } from "@/Components/ProjectInfo/ProjectBottom";
import { Text24, Text30 } from "@/Components/common/text";
import Projects from "@/Components/Admin/projects/projects";
import { sanity } from "@/Components/Client/sanity/sanity-client";
import groq from "groq";
import { useStore } from "@/Store/useStore";
import { projectFields } from "@/Components/Admin/queries/__queries";

import { Tabs } from "antd";
import ProjectsDrag from "@/Components/Admin/projects-drag/projects-drag";
import styled from "styled-components";
const { TabPane } = Tabs;

const FixedPanel = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 16px;
  background-color: #fff;
`;

const Wrapper = styled.div`
  &&& {
    width: 100%;
  }

  position: relative;
`;

const Overflow = styled.div`
  width: 100%;
  height: 100%;

  background: red;

  display: flex;
  overflow: hidden;

  position: fixed;
  z-index: 99999999;
`;

const ProjectsPage = () => {
  const router = useRouter();

  const logId = useStore(({ logId }) => logId);

  const [projects, setProjects] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const query = groq`
      *[_type == "projects"] {
        ${projectFields}
      }
      | order(cr desc)
    `;

    setLoading(true);

    sanity
      .fetch(query)
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch(console.error);
  }, [logId]);

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

        {projects && !loading && (
          <Wrapper>
            <Tabs defaultActiveKey="1">
              <TabPane tab="Все проекты" key="1">
                <Projects data={projects} />
              </TabPane>
              <TabPane tab="Сортировка" key="2">
                <ProjectsDrag loading={loading} data={projects} />
              </TabPane>
            </Tabs>
          </Wrapper>
        )}
      </AdminWrapper>
    </>
  );
};

export default ProjectsPage;
