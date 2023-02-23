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
import { sanity } from "@/Components/Client/sanity/sanity-client";
import { useStore } from "@/Store/useStore";

import moment from "moment/moment";

const { TabPane } = Tabs;

const ProjectPage = ({ cats, id, mode, initialValues }) => {
  const [section, setSection] = useState("common");
  const router = useRouter();

  const setLogId = useStore(({ setLogId }) => setLogId);

  const cfgs = {
    onCompleted: () => {
      setLogId();
      notification.success({
        message: `Данные сохранились!`,
        placement: "bottom",
      });

      router.push(`/admin/projects`, null, { shallow: false });
    },
    onError: (e) => {
      console.log("e", e);

      setLogId();
      notification.error({
        message: `Ошибка!`,
        placement: "bottom",
      });

      router.push(`/admin/projects`, null, { shallow: false });
    },
  };

  const addProject = async (e) => {
    const data = { ...e, cr: moment().toISOString(), _type: "projects" };

    try {
      await sanity.create(data);
      cfgs.onCompleted();
    } catch (err) {
      cfgs.onError();
    }
  };

  const editProject = async (e, id) => {
    const data = { ...e };

    try {
      await sanity.patch(id).set(data).commit();
      cfgs.onCompleted();
    } catch (err) {
      cfgs.onError();
    }
  };

  const handleFinish = (e) => {
    if (!e) return;

    if (mode === "new") {
      addProject(e);
    } else if (mode === "edit") {
      editProject(e, id);
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
