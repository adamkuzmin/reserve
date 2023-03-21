import { Gap } from "@/Components/About/common/styles";
import AdminWrapper from "@/Components/Admin/admin-wrapper/admin-wrapper";
import ImageMultiUploader from "@/Components/Admin/project/a-common/blocks/image-multi-upload";
import { AboutQuery } from "@/Components/Admin/queries/__queries";
import { sanity } from "@/Components/Client/sanity/sanity-client";
import { Text36, Wrap30 } from "@/Components/common/text";
import { WideButton } from "@/Components/ProjectInfo/ProjectBottom";
import { Form, Input, notification } from "antd";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

const About = () => {
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
    const query = AboutQuery;

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

            <Wrap30>
              <Form.Item {...{ rules }} name="block2">
                <Input.TextArea autoSize />
              </Form.Item>
            </Wrap30>

            <Gap sheight={"64px"} />

            <Wrap30>
              <Form.Item {...{ rules }} name="block3_title">
                <Input />
              </Form.Item>
            </Wrap30>

            <Wrap30>
              <Form.Item {...{ rules }} name="block3_label">
                <Input />
              </Form.Item>
            </Wrap30>

            <Wrap30>
              <Form.Item {...{ rules }} name="block3_content">
                <Input.TextArea autoSize />
              </Form.Item>
            </Wrap30>

            <Gap sheight={"64px"} />

            <Wrap30>
              <Form.Item {...{ rules }} name="block4_title">
                <Input />
              </Form.Item>
            </Wrap30>

            <Wrap30>
              <Form.Item {...{ rules }} name="block4_content">
                <Input.TextArea autoSize />
              </Form.Item>
            </Wrap30>

            <Gap sheight={"64px"} />

            <Wrap30>
              <Form.Item {...{ rules }} name="block5_content">
                <Input.TextArea autoSize />
              </Form.Item>
            </Wrap30>

            <Gap sheight={"36px"} />

            <Wrap30 data-font="Wremena" style={{ marginBottom: "24px" }}>
              <h3>Слайдер</h3>
            </Wrap30>

            <Form.Item style={{ width: "100%" }} name="slider">
              <ImageMultiUploader label={null} />
            </Form.Item>

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

export default About;
