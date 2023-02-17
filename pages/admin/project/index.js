import {
  ADD_PROJECT,
  EDIT_PROJECT,
} from "@/Components/Admin/project/__queries";
import { Tabs } from "@/Components/Admin/project/__styled";
import { Text48 } from "@/Components/common/text";
import { WideButton } from "@/Components/ProjectInfo/ProjectBottom";

import { useMutation } from "@apollo/client";
import client from "@/Components/Client/apollo/apollo-client";

import { Form, notification } from "antd";
import { useRouter } from "next/router";
import { useState } from "react";
import AdminWrapper from "../../../Components/Admin/admin-wrapper/admin-wrapper";
import Common from "../../../Components/Admin/project/a-common/common";
import Editor from "../../../Components/Admin/project/b-editor/editor";
import Nav from "../../../Components/Admin/project/nav/nav";
import { getProjectsHub } from "../projects";

const { TabPane } = Tabs;

const ProjectPage = ({ cats, id, mode, initialValues }) => {
  const [section, setSection] = useState("common");
  const router = useRouter();

  const cfgs = {
    refetchQueries: [{ query: getProjectsHub }, "getProjects"],
    onCompleted: () => {
      notification.success({
        message: `Данные сохранились!`,
        placement: "bottom",
      });

      router.push(`/admin/projects`, null, { shallow: false });
    },
    onError: () => {
      notification.error({
        message: `Ошибка!`,
        placement: "bottom",
      });

      router.push(`/admin/projects`, null, { shallow: false });
    },
  };

  const [addProject] = useMutation(ADD_PROJECT, {
    client,
    ...cfgs,
  });
  const [editProject] = useMutation(EDIT_PROJECT, { client, ...cfgs });

  const handleFinish = (e) => {
    if (!e) return;

    if (mode === "new") {
      addProject({ variables: { object: e } });
    } else if (mode === "edit") {
      editProject({ variables: { object: e, project_id: id } });
    }
  };

  if (!id) return <></>;

  return (
    <>
      <AdminWrapper panel={<Nav {...{ section, setSection }} />}>
        <Form
          layout="vertical"
          style={{ width: "100%" }}
          onFinish={handleFinish}
          initialValues={initialValues}
        >
          <Tabs activeKey={section}>
            <TabPane tab="common" key="common">
              <Common cats={cats} />
            </TabPane>
            <TabPane tab="editor" key="editor">
              <Editor />
            </TabPane>
          </Tabs>

          <Form.Item>
            <WideButton
              style={{ background: "black", color: "white" }}
              htmlType="submit"
            >
              <Text48>Сохранить изменения</Text48>
            </WideButton>
          </Form.Item>
        </Form>
      </AdminWrapper>
    </>
  );
};

export default ProjectPage;
