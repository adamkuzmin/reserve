import { sanity } from "@/Components/Client/sanity/sanity-client";
import { Text36, Wrap30 } from "@/Components/common/text";
import { WideButton } from "@/Components/ProjectInfo/ProjectBottom";
import { Form, Input, Modal, notification } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import ImageSingleUploader from "../project/a-common/blocks/image-single-upload";
import { MemberQuery } from "../queries/__queries";

const MemberModal = ({ member, onClose = () => {} }) => {
  const [initialValues, setInitialValues] = useState();
  const [isFetched, setFetched] = useState(false);

  const { id, categoryId } = member ? member : {};

  const cfgs = {
    onCompleted: () => {
      notification.success({
        message: `Данные сохранились!`,
        placement: "bottom",
      });

      onClose();
    },
    onError: (e) => {
      notification.error({
        message: `Ошибка!`,
        placement: "bottom",
      });

      onClose();
    },
  };

  useEffect(() => {
    if (member && member.id) {
      const query = MemberQuery;

      sanity
        .fetch(query, { id })
        .then((data) => {
          setInitialValues(data);
          setFetched(true);
        })
        .catch(() => setFetched(true));
    }
  }, [member]);

  const addProject = async (e, categoryId) => {
    const data = {
      ...e,
      team_category: {
        _type: "reference",
        _ref: categoryId,
      },
      cr: moment().toISOString(),
      _type: "team_members",
    };

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
    if (categoryId) {
      if (initialValues && Object.keys(initialValues).length > 0) {
        const { _id: id } = initialValues;

        editProject(e, id, categoryId);
      } else {
        addProject(e, categoryId);
      }
    }
  };

  const rules = [
    {
      required: true,
      message: "Поле не заполнено",
    },
  ];

  return (
    <>
      <Modal open={id ? true : false} onCancel={() => onClose()} footer={null}>
        {isFetched && (
          <Form
            layout="vertical"
            style={{ width: "100%", marginTop: "64px" }}
            onFinish={handleFinish}
            initialValues={initialValues}
          >
            <Form.Item style={{ width: "100%" }} name="url">
              <ImageSingleUploader />
            </Form.Item>

            <Wrap30>
              <Form.Item {...{ rules }} name="name">
                <Input placeholder="Имя Фамилия" />
              </Form.Item>
            </Wrap30>

            <Wrap30>
              <Form.Item {...{ rules }} name="label">
                <Input placeholder="Должность" />
              </Form.Item>
            </Wrap30>

            <Form.Item>
              <WideButton
                style={{
                  background: "black",
                  color: "white",
                  marginBottom: "0",
                  height: "120px",
                }}
                htmlType="submit"
              >
                <Text36>Сохранить изменения</Text36>
              </WideButton>
            </Form.Item>
          </Form>
        )}
      </Modal>
    </>
  );
};

export default MemberModal;
