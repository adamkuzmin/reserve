import { Text30, Text60, Wrap30 } from "@/Components/common/text";
import { ProjectCols } from "@/Components/ProjectInfo/ProjectContent";
import {
  Header,
  ProjectHeaderWrapper,
  StyledText24,
} from "@/Components/ProjectInfo/ProjectHeader";
import { Form, Input } from "antd";
import Address from "./blocks/address";
import QuillEditor from "./blocks/quill";
import ProjectName from "./blocks/title";
import { About } from "@/Components/ProjectInfo/ProjectContent";

const { TextArea } = Input;

const Constructor = ({ isEdit = false }) => {
  return (
    <>
      <ProjectHeaderWrapper>
        <Header>
          <Header.Title>
            <p>
              <Wrap30 data-font="wremena">
                <div style={{ display: "flex" }}>
                  <Form.Item style={{ marginBottom: "0px" }} name="city">
                    <Address />
                  </Form.Item>
                  <span>,</span>
                  <Form.Item style={{ marginBottom: "0px" }} name="address">
                    <Address />
                  </Form.Item>
                </div>
              </Wrap30>
            </p>
            <Form.Item style={{ marginBottom: "0px" }} name="name">
              <ProjectName />
            </Form.Item>
          </Header.Title>
        </Header>
        <StyledText24>
          <QuillEditor {...{ isEdit }} type="comment" />
        </StyledText24>
      </ProjectHeaderWrapper>
      <br />
      <br />

      <ProjectCols>
        <ProjectCols.LeftCol>
          <About>
            <Form.Item style={{ width: "100%" }} name="description">
              <QuillEditor {...{ isEdit }} type="description" />
            </Form.Item>
          </About>
        </ProjectCols.LeftCol>

        <ProjectCols.RightCol>
          <Form.Item style={{ width: "100%" }} name="meta">
            <QuillEditor {...{ isEdit }} type="meta" />
          </Form.Item>
        </ProjectCols.RightCol>
      </ProjectCols>
    </>
  );
};

export default Constructor;
