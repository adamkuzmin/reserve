import { Form, Upload } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { Content } from "../../../common/body";
import { Text24, Text30, Text60, Wrap24 } from "../../../common/text";
import { ProjectCols } from "../../../ProjectInfo/ProjectContent";
import ProjectHeader, {
  Header,
  ProjectHeaderWrapper,
  StyledText24,
} from "../../../ProjectInfo/ProjectHeader";
import QuillEditor from "./blocks/quill";

const Editor = () => {
  return (
    <>
      <Form style={{ width: "100%" }} layout="vertical">
        {/* Контент */}
        <Content>
          <ProjectHeaderWrapper>
            <Header>
              <Header.Title>
                <p>
                  <Text30 data-font="wremena">{"Москва, ул. Косыгина"}</Text30>
                </p>
                <h3>
                  <Text60 data-type="title">
                    {"Жилой комплекс Wine House (г. Москва)"}
                  </Text60>
                </h3>
              </Header.Title>
            </Header>
            <StyledText24>
              <Wrap24>
                <Form.Item>
                  <TextArea
                    autoSize
                    bordered={false}
                    style={{ color: "rgba(0,0,0,.6)", lineHeight: 1.2 }}
                    placeholder="Вы можете оставить здесь дополнительный комментарий о проекте"
                  />
                </Form.Item>
              </Wrap24>
            </StyledText24>
          </ProjectHeaderWrapper>
          <br />
          <br />

          <ProjectCols>
            <ProjectCols.LeftCol>
              <Form.Item style={{ width: "100%" }} name="description">
                <QuillEditor type="description" />
              </Form.Item>
            </ProjectCols.LeftCol>
            <ProjectCols.RightCol>
              <Form.Item style={{ width: "100%" }} name="meta">
                <QuillEditor type="meta" />
              </Form.Item>
            </ProjectCols.RightCol>
          </ProjectCols>
        </Content>
      </Form>
    </>
  );
};

export default Editor;
