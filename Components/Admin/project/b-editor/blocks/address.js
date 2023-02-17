import { Text30 } from "@/Components/common/text";

const Address = ({ value, onChange = () => {} }) => {
  return (
    <span style={{ paddingLeft: "6px" }}>{value ? value : "(Пусто)"}</span>
  );
};

export default Address;
