import { client, sanity } from "@/Components/Client/sanity/sanity-client";
import { Text48 } from "@/Components/common/text";
import { WideButton } from "@/Components/ProjectInfo/ProjectBottom";
import { useStore } from "@/Store/useStore";
import { Form, notification } from "antd";
import { useEffect, useState } from "react";
import { Wrapper } from "../__styled";
import Tree from "./blocks/tree";

const Transfer = ({ data = [], slider = [] }) => {
  const [initialValues, setInitialValues] = useState();

  useEffect(() => {
    const tree = slider
      .filter((item = {}) => {
        const { project_id } = item;

        const found = data.find(({ _id }) => _id === project_id);
        return found;
      })
      .map((item = {}) => {
        const { project_id } = item;

        return project_id;
      });

    return setInitialValues({ tree });
  }, [slider, data]);

  const rules = [
    {
      validator(_, value) {
        if (!value || value.length < 6) {
          return Promise.reject(new Error("Должно быть не менее 6 проектов"));
        }
        return Promise.resolve();
      },
    },
  ];

  const setLogId = useStore(({ setLogId }) => setLogId);

  const handleFinish = async (e) => {
    const { tree = [] } = e;

    await sanity.delete({ query: '*[_type == "slider"]' });

    const slides = tree.map((id, i) => ({ project_id: id, order: i }));

    await Promise.all(
      slides.map((item) => {
        const create = {
          _type: "slider",
          ...item,
        };

        console.log("create", create);

        return sanity.create(create);
      })
    );

    notification.success({
      message: `Данные сохранились!`,
      placement: "bottom",
    });

    setLogId();
  };

  if (!initialValues) return <></>;

  return (
    <>
      <Wrapper>
        <Form
          onFinish={handleFinish}
          layout="vertical"
          initialValues={initialValues}
        >
          <Form.Item name="tree" rules={rules}>
            <Tree data={data} />
          </Form.Item>

          <Form.Item>
            <WideButton
              style={{ background: "black", color: "white" }}
              htmlType="submit"
            >
              <Text48>Сохранить изменения</Text48>
            </WideButton>
          </Form.Item>
        </Form>
      </Wrapper>
    </>
  );
};

export default Transfer;
