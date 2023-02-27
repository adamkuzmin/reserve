const {
  default: ProjectsWrapper,
} = require("@/Components/Admin/media/projects-wrapper");

const Exhibitions = () => {
  const section = { label: "выставка", name: "exhibitions", cover: true };

  return <ProjectsWrapper {...{ section }} />;
};

export default Exhibitions;
