import { Form, Upload } from "antd";
import { Content } from "../../../common/body";
import ProjectHeader from "../../../ProjectInfo/ProjectHeader";

const Editor = () => {
  return (
    <>
      <Form style={{ width: "100%" }} layout="vertical">
        <Form.Item>
          <Upload />
        </Form.Item>

        {/* Контент */}
        <Content>
          <ProjectHeader />
        </Content>
      </Form>
    </>
  );
};

export default Editor;
