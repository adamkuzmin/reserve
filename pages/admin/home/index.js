import AdminWrapper from "@/Components/Admin/admin-wrapper/admin-wrapper";
import Items4 from "@/Components/Admin/home/blocks/items-4";
import { sanity } from "@/Components/Client/sanity/sanity-client";
import { Wrap30 } from "@/Components/common/text";
import { Form, Input } from "antd";
import groq from "groq";
import { useEffect, useMemo, useState } from "react";

const Home = () => {
  const [values, setValues] = useState();
  const [isFetched, setFetched] = useState(false);

  useEffect(() => {
    const query = groq`
      *[_type == "home" ] {
        block1,
        block2_numbers[],
        block2_labels[],
        block3_1,
        block3_2,
        block3_3,
        block4_1,
        block5_1,
        block5_2,
        block6_1
      }
      `;

    sanity
      .fetch(query)
      .then((data) => {
        setValues(data);
        setFetched(true);
      })
      .catch(() => setFetched(true));
  }, []);

  const handleFinish = () => {};

  const initialValues = useMemo(() => {
    if (!(values && isFetched)) return;

    if (values.length > 0) return values[0];
  }, [values, isFetched]);

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
          onValuesChange={(e, b) => console.log("dd", b)}
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

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(1,1fr)",
              }}
            >
              <Form.Item {...{ rules }} name="block2_numbers">
                <Items4 />
              </Form.Item>

              <Form.Item {...{ rules }} name="block2_labels">
                <Items4 />
              </Form.Item>
            </div>

            <div style={{ display: "flex" }}>
              <Form.Item {...{ rules }} name="block3_1">
                <Input />
              </Form.Item>

              <Form.Item {...{ rules }} name="block3_2">
                <Input />
              </Form.Item>

              <Form.Item {...{ rules }} name="block3_3">
                <Input.TextArea autoSize />
              </Form.Item>
            </div>
          </div>
        </Form>
      )}
    </AdminWrapper>
  );
};

export default Home;
