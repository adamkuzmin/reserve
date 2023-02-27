import AdminWrapper from "@/Components/Admin/admin-wrapper/admin-wrapper";
import Projects from "@/Components/Admin/media/projects";
import { sanity } from "@/Components/Client/sanity/sanity-client";
import { Text30 } from "@/Components/common/text";
import { WideButton } from "@/Components/ProjectInfo/ProjectBottom";
import { useStore } from "@/Store/useStore";
import groq from "groq";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const ProjectsWrapper = ({ section = {} }) => {
  const router = useRouter();

  const logId = useStore(({ logId }) => logId);

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const query = groq`
      *[_type == "${section.name}"] {
        _id,
        name,
        description,
        cr
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
            router.push(`/admin/${section.name}/a/${uuidv4()}`, null, {
              shallow: true,
            })
          }
        >
          <Text30>Добавить {section.label}</Text30>
        </WideButton>

        <br />
        <br />

        {projects && !loading && <Projects data={projects} {...{ section }} />}
      </AdminWrapper>
    </>
  );
};

export default ProjectsWrapper;
