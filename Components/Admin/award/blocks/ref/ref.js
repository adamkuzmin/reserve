import React, { useState } from "react";
import { Input, Select, Button } from "antd";
import { Form } from "./__styled";

const { Option } = Select;

const Ref = ({ initialValues, projects = [] }) => {
  const [form] = Form.useForm();
  const [selectedRefs, setSelectedRefs] = useState([]);

  const handleSubmit = (values) => {
    console.log("Form values:", values);
    console.log("Selected awards refs:", selectedRefs);
    // Call your API or submit the form data here
  };

  const handleSelectChange = (values) => {
    setSelectedRefs(values);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault(); // Cancel the default form submission behavior
    form.submit(); // Manually call the form submission
  };

  return (
    <Form initialValues={initialValues} form={form} onFinish={handleSubmit}>
      <Form.Item label="Номинация" name="cover">
        <Input />
      </Form.Item>
      <Form.Item label="Проект" name="project">
        <Select onChange={handleSelectChange}>
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
    </Form>
  );
};

export default Ref;
