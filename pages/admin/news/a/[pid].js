import ProjectWrapper from "@/Components/Admin/media/project-wrapper";

const NewsPID = () => {
  const section = { label: "новость", name: "news" };

  return <ProjectWrapper {...{ section }} />;
};

export default NewsPID;
