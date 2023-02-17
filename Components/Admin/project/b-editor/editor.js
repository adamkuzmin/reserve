import { Text48 } from "@/Components/common/text";
import { WideButton } from "@/Components/ProjectInfo/ProjectBottom";
import { Button, Form } from "antd";
import Constructor from "./constructor";

const Editor = () => {
  return (
    <>
      {/* Контент */}
      <Constructor {...{ isEdit: true }} />
    </>
  );
};

export default Editor;
