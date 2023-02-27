const {
  default: ProjectsWrapper,
} = require("@/Components/Admin/media/projects-wrapper");

const Vacancies = () => {
  const section = { label: "вакансия", name: "vacancies" };

  return <ProjectsWrapper {...{ section }} />;
};

export default Vacancies;
