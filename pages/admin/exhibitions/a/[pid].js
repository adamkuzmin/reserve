import ProjectWrapper from "@/Components/Admin/media/project-wrapper";

const NewsPID = () => {
  const section = { label: "выставка", name: "exhibitions", cover: true };

  return <ProjectWrapper {...{ section }} />;
};

export default NewsPID;
