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

        {projects && !loading && <Projects data={projects} />}
      </AdminWrapper>
    </>
  );
};

export default ProjectsPage;
