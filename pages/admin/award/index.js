import { Text48, Wrap24, Wrap30 } from "@/Components/common/text";
import { WideButton } from "@/Components/ProjectInfo/ProjectBottom";

import { Form, Input, InputNumber, notification } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AdminWrapper from "../../../Components/Admin/admin-wrapper/admin-wrapper";
import Nav from "../../../Components/Admin/project/nav/nav";
import { sanity } from "@/Components/Client/sanity/sanity-client";
import { useStore } from "@/Store/useStore";

import moment from "moment/moment";
import { Gap } from "@/Components/About/common/styles";
import ImageSingleUploader from "@/Components/Admin/project/a-common/blocks/image-single-upload";
import Refs from "@/Components/Admin/award/blocks/refs/refs";

const AwardPage = ({ id, mode, initialValues, formLogId }) => {
  const router = useRouter();
  const [form] = Form.useForm();

  useEffect(() => {
    if (!form) return;
    form.setFieldsValue(initialValues);
  }, [formLogId, initialValues]);

  const setLogId = useStore(({ setLogId }) => setLogId);

  const cfgs = {
    onCompleted: () => {
      setLogId();
      notification.success({
        message: `Данные сохранились!`,
        placement: "bottom",
      });

      router.push(`/admin/awards`, null, { shallow: false });
    },
    onError: (e) => {
      setLogId();
      notification.error({
        message: `Ошибка!`,
        placement: "bottom",
      });

      router.push(`/admin/awards`, null, { shallow: false });
    },
  };

  const addProject = async (e) => {
    const data = { ...e, cr: moment().toISOString(), _type: "awards" };

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
      <AdminWrapper>
        <Form
          layout="vertical"
          style={{ width: "100%" }}
          onFinish={handleFinish}
          initialValues={initialValues}
          form={form}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "700px",
              display: "flex",
              flexDirection: "column",
            }}
            layout="vertical"
          >
            <Wrap30 data-font="Wremena">
              <h3>1. Год</h3>
            </Wrap30>

            <Wrap30>
              <Form.Item
                style={{ marginLeft: "10px", width: "100%" }}
                name="year"
                rules={[
                  {
                    required: true,
                    message: "Поле не заполнено",
                  },
                ]}
              >
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
            </Wrap30>

            <Gap sheight={"36px"} />

            <Wrap30 data-font="Wremena">
              <h3>2. Обложка награды</h3>
            </Wrap30>

            <Wrap30>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Поле не заполнено",
                  },
                ]}
                name="cover"
              >
                <ImageSingleUploader />
              </Form.Item>
            </Wrap30>

            <Gap sheight={"36px"} />

            <Wrap30 data-font="Wremena">
              <h3>3. Проекты</h3>
            </Wrap30>

            <Wrap24>
              <Form.Item name="awards_refs">
                <Refs awardId={id} mode={mode} />
              </Form.Item>
            </Wrap24>

            <Gap sheight={"36px"} />

            <Form.Item>
              <WideButton
                style={{ background: "black", color: "white" }}
                htmlType="submit"
              >
                <Text48>Сохранить изменения</Text48>
              </WideButton>
            </Form.Item>
          </div>
        </Form>
      </AdminWrapper>
    </>
  );
};

export default AwardPage;
