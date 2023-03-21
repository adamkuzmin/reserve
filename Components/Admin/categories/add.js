import { Button, Form, Input, notification } from "antd";
import { NameForm } from "./__styled";
import moment from "moment";
import { useStore } from "@/Store/useStore";
import { sanity } from "@/Components/Client/sanity/sanity-client";

const AddForm = ({ onClose = () => {} }) => {
  const setLogId = useStore(({ setLogId }) => setLogId);

  const cfgs = {
    onCompleted: () => {
      setLogId();
      notification.success({
        message: `Данные сохранились!`,
        placement: "bottom",
      });
    },
    onError: (e) => {
      setLogId();
      notification.error({
        message: `Ошибка!`,
        placement: "bottom",
      });
    },
  };

  const addProject = async (e) => {
    const data = { ...e, cr: moment().toISOString(), _type: "categories" };

    try {
      await sanity.create(data);
      cfgs.onCompleted();
    } catch (err) {
      cfgs.onError();
    }
  };

  return (
    <>
      <NameForm onFinish={(e) => addProject(e)} layout="horizontal">
        <Form.Item
          rules={[{ required: true, message: "Поле не может быть пустым" }]}
          name={"name"}
          style={{ marginBottom: 0 }}
        >
          <Input style={{ width: "400px" }} />
        </Form.Item>

        <Form.Item>
          <div style={{ display: "flex" }}>
            <Button htmlType="submit" type="primary">
              Сохранить
            </Button>
            <Button onClick={() => onClose(false)}>Отмена</Button>
          </div>
        </Form.Item>
      </NameForm>
    </>
  );
};

export default AddForm;
