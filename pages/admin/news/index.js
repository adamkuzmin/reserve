const {
  default: ProjectsWrapper,
} = require("@/Components/Admin/media/projects-wrapper");

const News = () => {
  const section = { label: "новость", name: "news" };

  return <ProjectsWrapper {...{ section }} />;
};

export default News;
