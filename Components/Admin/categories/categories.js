import { Text24, Wrap24 } from "@/Components/common/text";
import {
  PTable,
  StyledText,
  TableWrapper,
} from "@/Components/ProjectsLayout/ProjectsTable";
import { notification, Space, Popconfirm, Form, Input, Button } from "antd";
import { sanity } from "@/Components/Client/sanity/sanity-client";
import { useState } from "react";
import { useStore } from "@/Store/useStore";
import { EditOutlined } from "@ant-design/icons";
import { Edit, NameForm } from "./__styled";

const Name = ({ name: a, id }) => {
  const [edit, setEdit] = useState(false);

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

  const editCat = async (e, id) => {
    const data = { ...e };

    try {
      await sanity.patch(id).set(data).commit();
      cfgs.onCompleted();
    } catch (err) {
      cfgs.onError();
    }
  };

  return (
    <>
      {edit ? (
        <NameForm
          onFinish={(e) => editCat(e, id)}
          initialValues={{ name: a }}
          layout="horizontal"
        >
          <Form.Item
            rules={[{ required: true, message: "Поле не может быть пустым" }]}
            name={"name"}
            style={{ marginBottom: 0 }}
          >
            <Input style={{ maxWidth: "400px" }} />
          </Form.Item>

          <Form.Item>
            <div style={{ display: "flex" }}>
              <Button htmlType="submit" type="primary">
                Сохранить
              </Button>
              <Button onClick={() => setEdit(false)}>Отмена</Button>
            </div>
          </Form.Item>
        </NameForm>
      ) : (
        <div style={{ display: "flex" }}>
          <StyledText data-type="link" data-weight="semibold" data-font="ibm">
            {a}
          </StyledText>

          <Edit>
            <EditOutlined onClick={() => setEdit(true)} />
          </Edit>
        </div>
      )}
    </>
  );
};

const columns = (handleDelete = () => {}) => [
  {
    title: "Название",
    dataIndex: "name",
    width: "40%",
    key: "name",
    render: (a, { _id }) => <Name name={a} id={_id} />,
  },
  {
    title: "Действия",
    dataIndex: "action",
    width: "10%",
    key: "action",
    render: (a, { _id }) => (
      <Space>
        <Popconfirm
          title="Действительно хотите удалить?"
          onConfirm={() => handleDelete(_id)}
          onCancel={() => {}}
          okText="Да"
          cancelText="Нет"
        >
          <Text24
            style={{ cursor: "pointer", color: "red", fontWeight: "400" }}
            data-type="link"
            data-weight="semibold"
            data-font="ibm"
          >
            Удалить
          </Text24>
        </Popconfirm>
      </Space>
    ),
  },
];

const Categories = ({ data }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const setLogId = useStore(({ setLogId }) => setLogId);

  const deleteProject = async (cat_id) => {
    setIsDeleting(true);

    try {
      await sanity.delete(cat_id);

      notification.success({
        message: `Категория удалена!`,
        placement: "bottom",
      });
      setLogId();
    } catch (err) {
      console.error(err);

      notification.error({
        message: `Ошибка при удалении`,
        placement: "bottom",
      });
    }

    setIsDeleting(false);
  };

  return (
    <>
      <Wrap24 swidth={"100%"}>
        <TableWrapper>
          <PTable
            columns={columns(deleteProject)}
            dataSource={data}
            showSizeChanger={false}
            pagination={false}
          />
        </TableWrapper>
      </Wrap24>
    </>
  );
};

export default Categories;
