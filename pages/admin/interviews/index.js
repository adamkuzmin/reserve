const {
  default: ProjectsWrapper,
} = require("@/Components/Admin/media/projects-wrapper");

const Interviews = () => {
  const section = { label: "интервью", name: "interviews" };

  return <ProjectsWrapper {...{ section }} />;
};

export default Interviews;
