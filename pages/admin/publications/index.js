const {
  default: ProjectsWrapper,
} = require("@/Components/Admin/media/projects-wrapper");

const Publications = () => {
  const section = { label: "публикация", name: "publications", cover: true };

  return <ProjectsWrapper {...{ section }} />;
};

export default Publications;
