import ProjectWrapper from "@/Components/Admin/media/project-wrapper";

const NewsPID = () => {
  const section = { label: "публикации", name: "publications", cover: true };

  return <ProjectWrapper {...{ section }} />;
};

export default NewsPID;
