import { Text60 } from "@/Components/common/text";

const ProjectName = ({ value, onChange = () => {} }) => {
  return (
    <h3>
      <Text60 data-type="title">{value}</Text60>
    </h3>
  );
};

export default ProjectName;
