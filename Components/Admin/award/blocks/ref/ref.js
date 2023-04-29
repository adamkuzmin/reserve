import React, { useState } from "react";
import { Input, Select, Button, notification, Popconfirm } from "antd";
import { Form, RemovePanel } from "./__styled";
import { useStore } from "@/Store/useStore";
import { sanity } from "@/Components/Client/sanity/sanity-client";
import { DeleteOutlined } from "@ant-design/icons";

const { Option } = Select;

const Ref = ({ initialValues, projects = [] }) => {
  const [form] = Form.useForm();
  const [selectedRefs, setSelectedRefs] = useState([]);

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

  const handleSubmit = async (values) => {
    const { _id } = initialValues;
    const { cover, project } = values;
    let data = {
      cover,
    };

    if (_id) {
      if (project) {
        data.project = {
          _type: "reference",
          _ref: project,
        };
      } else {
        data.project = null;
      }

      try {
        await sanity.patch(_id).set(data).commit();

        cfgs.onCompleted();
      } catch (err) {
        cfgs.onError();
      }
    }
  };

  const handleSelectChange = (values) => {
    setSelectedRefs(values);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault(); // Cancel the default form submission behavior
    form.submit(); // Manually call the form submission
  };

  const handleDelete = async () => {
    const { _id } = initialValues;

    if (_id) {
      try {
        await sanity.delete(_id);

        cfgs.onCompleted();
      } catch (err) {
        cfgs.onError();
      }
    }
  };

  return (
    <>
      <Form initialValues={initialValues} form={form} onFinish={handleSubmit}>
        <Popconfirm
          title="Действительно хотите удалить?"
          onConfirm={() => handleDelete()}
          onCancel={() => {}}
          okText="Да"
          cancelText="Нет"
        >
          <RemovePanel>
            <DeleteOutlined />
            <span>Удалить</span>
          </RemovePanel>
        </Popconfirm>

        <Form.Item label="Номинация" name="cover">
          <Input />
        </Form.Item>
        <Form.Item label="Проект" name="project">
          <Select
            showSearch
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            onChange={handleSelectChange}
          >
            {projects &&
              projects.map(({ _id, name }) => {
                return (
                  <Option value={_id} key={`f:${_id}`}>
                    {name}
                  </Option>
                );
              })}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={handleFormSubmit} htmlType="submit">
            Сохранить
          </Button>
        </Form.Item>
        <div style={{ padding: "0", margin: 0 }}>
          <span style={{ color: "black", fontSize: "14px" }}>
            *Не забудьте сохранить обновления у этой отдельной карточки
          </span>
        </div>
      </Form>
    </>
  );
};

export default Ref;
