import { Gap } from "@/Components/About/common/styles";
import AdminWrapper from "@/Components/Admin/admin-wrapper/admin-wrapper";
import Items4 from "@/Components/Admin/home/blocks/items-4";
import { Block3 } from "@/Components/Admin/home/__styles";
import { HomeQuery } from "@/Components/Admin/queries/__queries";
import { sanity } from "@/Components/Client/sanity/sanity-client";
import { Text36, Text48, Wrap30 } from "@/Components/common/text";
import { WideButton } from "@/Components/ProjectInfo/ProjectBottom";
import { Form, Input, notification } from "antd";
import groq from "groq";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

const Home = () => {
  const [values, setValues] = useState();
  const [isFetched, setFetched] = useState(false);

  const router = useRouter();

  const cfgs = {
    onCompleted: () => {
      notification.success({
        message: `Данные сохранились!`,
        placement: "bottom",
      });

      router.push(`/admin/`, null, { shallow: false });
    },
    onError: (e) => {
      notification.error({
        message: `Ошибка!`,
        placement: "bottom",
      });

      router.push(`/admin/`, null, { shallow: false });
    },
  };

  useEffect(() => {
    const query = HomeQuery;

    sanity
      .fetch(query)
      .then((data) => {
        setValues(data);
        setFetched(true);
      })
      .catch(() => setFetched(true));
  }, []);

  const initialValues = useMemo(() => {
    if (!(values && isFetched)) return;

    if (values.length > 0) return values[0];
  }, [values, isFetched]);

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
    if (initialValues) {
      const { _id: id } = initialValues;

      editProject(e, id);
    }
  };

  const rules = [
    {
      required: true,
      message: "Поле не заполнено",
    },
  ];

  return (
    <AdminWrapper>
      {isFetched && initialValues && (
        <Form
          layout="vertical"
          style={{ width: "100%", marginTop: "64px" }}
          onFinish={handleFinish}
          initialValues={initialValues}
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
            <Wrap30>
              <Form.Item {...{ rules }} name="block1">
                <Input.TextArea autoSize />
              </Form.Item>
            </Wrap30>

            <Gap sheight={"36px"} />

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(1,1fr)",
              }}
            >
              <Form.Item {...{ rules }} name="block2_numbers">
                <Items4 wrap30 />
              </Form.Item>

              <Form.Item {...{ rules }} name="block2_labels">
                <Items4 textarea />
              </Form.Item>
            </div>

            <Gap sheight={"64px"} />

            <Block3>
              <Wrap30>
                <Form.Item {...{ rules }} name="block3_1">
                  <Input />
                </Form.Item>
              </Wrap30>

              <Form.Item {...{ rules }} name="block3_2">
                <Input.TextArea rows={4} />
              </Form.Item>

              <Form.Item {...{ rules }} name="block3_3">
                <Input.TextArea rows={4} />
              </Form.Item>
            </Block3>

            <Gap sheight={"64px"} />
            <Wrap30>
              <Form.Item {...{ rules }} name="block5_1">
                <Input />
              </Form.Item>
            </Wrap30>
            <Form.Item {...{ rules }} name="block5_2">
              <Input.TextArea rows={4} />
            </Form.Item>

            <Gap sheight={"64px"} />
            <Wrap30>
              <Form.Item {...{ rules }} name="block6_1">
                <Input.TextArea rows={4} />
              </Form.Item>
            </Wrap30>

            <Gap sheight={"36px"} />

            <Form.Item>
              <WideButton
                style={{ background: "black", color: "white" }}
                htmlType="submit"
              >
                <Text36>Сохранить изменения</Text36>
              </WideButton>
            </Form.Item>
          </div>
        </Form>
      )}
    </AdminWrapper>
  );
};

export default Home;
