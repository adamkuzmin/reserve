import { Text48, Wrap30 } from "@/Components/common/text";
import { WideButton } from "@/Components/ProjectInfo/ProjectBottom";
import { useStore } from "@/Store/useStore";
import { Form, Input, notification } from "antd";
import { useRouter } from "next/router";
import ImageSingleUploader from "../project/a-common/blocks/image-single-upload";
import moment from "moment";
import QuillEditor from "../project/b-editor/blocks/quill";
import { sanity } from "@/Components/Client/sanity/sanity-client";

const Project = ({ initialValues, section = {}, mode, id }) => {
  const router = useRouter();
  const setLogId = useStore(({ setLogId }) => setLogId);

  const cfgs = {
    onCompleted: () => {
      setLogId();
      notification.success({
        message: `Данные сохранились!`,
        placement: "bottom",
      });

      router.push(`/admin/${section.name}`, null, { shallow: false });
    },
    onError: (e) => {
      console.log("e", e);

      setLogId();
      notification.error({
        message: `Ошибка!`,
        placement: "bottom",
      });

      router.push(`/admin/${section.name}`, null, { shallow: false });
    },
  };

  const addProject = async (e) => {
    const data = { ...e, cr: moment().toISOString(), _type: section.name };

    try {
      await sanity.create(data);
      cfgs.onCompleted();
    } catch (err) {
      console.log("err", err);

      cfgs.onError();
    }
  };

  const editProject = async (e, id) => {
    const data = { ...e };

    try {
      await sanity.patch(id).set(data).commit();
      cfgs.onCompleted();
    } catch (err) {
      console.log("err", err);

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

  const { cover } = section;

  const rules = [
    {
      required: true,
      message: "Поле не заполнено",
    },
  ];

  return (
    <>
      <Form
        layout="vertical"
        style={{ width: "100%", marginTop: "64px", maxWidth: "700px" }}
        onFinish={handleFinish}
        initialValues={initialValues}
      >
        {cover && (
          <Wrap30>
            <Form.Item style={{ width: "100%" }} name="cover" rules={rules}>
              <ImageSingleUploader />
            </Form.Item>
          </Wrap30>
        )}

        <Wrap30>
          <Form.Item style={{ width: "100%" }} name="name" rules={rules}>
            {!cover ? (
              <Input.TextArea rows={3} placeholder="Название" />
            ) : (
              <Input placeholder="Название" />
            )}
          </Form.Item>
        </Wrap30>

        {!cover && (
          <Form.Item style={{ width: "100%" }} name="description" rules={rules}>
            <QuillEditor {...{ isEdit: true }} type="description" />
          </Form.Item>
        )}

        <Form.Item>
          <WideButton
            style={{ background: "black", color: "white" }}
            htmlType="submit"
          >
            <Text48>Сохранить изменения</Text48>
          </WideButton>
        </Form.Item>
      </Form>
    </>
  );
};

export default Project;
