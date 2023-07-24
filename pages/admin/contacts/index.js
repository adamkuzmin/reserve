import { ContactsQuery } from "@/Components/Admin/queries/__queries";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { sanity } from "@/Components/Client/sanity/sanity-client";
import { Text14, Text36, Wrap30 } from "@/Components/common/text";
import { Form, Input, notification } from "antd";
import { useForm } from "antd/lib/form/Form";
import dynamic from "next/dynamic";
import { LabelRow } from "@/Components/Filters/styles";
import TextArea from "antd/lib/input/TextArea";
import { WideButton } from "@/Components/ProjectInfo/ProjectBottom";

const Address = dynamic(
  () => import("@/Components/Admin/project/a-common/blocks/address"),
  { ssr: false }
);

const {
  default: AdminWrapper,
} = require("@/Components/Admin/admin-wrapper/admin-wrapper");

const ContactsPage = () => {
  const [values, setValues] = useState();
  const [isFetched, setFetched] = useState(false);

  const router = useRouter();

  const [form] = useForm();

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
    const query = ContactsQuery;

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
    <>
      <AdminWrapper>
        {isFetched && initialValues && (
          <Form
            layout="vertical"
            style={{ width: "100%", marginTop: "64px" }}
            onFinish={handleFinish}
            initialValues={initialValues}
            form={form}
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
              <Wrap30 data-font="Wremena" style={{ marginBottom: "24px" }}>
                <h3>1. Название компании</h3>
              </Wrap30>

              <Wrap30>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Поле не заполнено",
                    },
                  ]}
                  style={{ maxWidth: "100%" }}
                  name="fullname"
                >
                  <TextArea
                    autoSize
                    style={{ width: "100%" }}
                    placeholder="Название компании"
                  />
                </Form.Item>

                <Form.Item name="lng" hidden>
                  <Input />
                </Form.Item>

                <Form.Item name="lat" hidden>
                  <Input />
                </Form.Item>
              </Wrap30>

              <br />
              <br />

              <Wrap30 data-font="Wremena" style={{ marginBottom: "24px" }}>
                <h3>2. Адреса</h3>
              </Wrap30>
              <LabelRow>
                <Text14 data-font="wremena">2.1 Фактический адрес</Text14>
              </LabelRow>

              <Wrap30>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Поле не заполнено",
                    },
                  ]}
                  style={{ maxWidth: "100%" }}
                  name="actual_location"
                >
                  <TextArea
                    autoSize
                    style={{ width: "100%" }}
                    placeholder="Фактический адрес"
                  />
                </Form.Item>
              </Wrap30>

              <LabelRow>
                <Text14 data-font="wremena">2.2 Юридический адрес</Text14>
              </LabelRow>

              <Wrap30>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Поле не заполнено",
                    },
                  ]}
                  style={{ maxWidth: "100%" }}
                  name="domicile"
                >
                  <TextArea
                    autoSize
                    style={{ width: "100%" }}
                    placeholder="Юридический адрес"
                  />
                </Form.Item>
              </Wrap30>

              <Wrap30 data-font="Wremena" style={{ marginBottom: "24px" }}>
                <h3>3. Карта</h3>
              </Wrap30>
              <Form.Item>
                <Address form={form} />
              </Form.Item>

              <br />
              <br />

              <Wrap30 data-font="Wremena" style={{ marginBottom: "24px" }}>
                <h3>4. Контактные номера</h3>
              </Wrap30>
              <LabelRow>
                <Text14 data-font="wremena">4.1 Номер #1</Text14>
              </LabelRow>

              <Wrap30>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Поле не заполнено",
                    },
                  ]}
                  style={{ maxWidth: "100%" }}
                  name="phone1"
                >
                  <TextArea
                    autoSize
                    style={{ width: "100%" }}
                    placeholder="Номер 1"
                  />
                </Form.Item>
              </Wrap30>

              <LabelRow>
                <Text14 data-font="wremena">4.2 Номер #2</Text14>
              </LabelRow>

              <Wrap30>
                <Form.Item
                  style={{ maxWidth: "100%" }}
                  name="phone2"
                >
                  <TextArea
                    autoSize
                    style={{ width: "100%" }}
                    placeholder="Номер 2"
                  />
                </Form.Item>
              </Wrap30>

              <br />
              <br />

              <Wrap30 data-font="Wremena" style={{ marginBottom: "24px" }}>
                <h3>5. Комментарий</h3>
              </Wrap30>

              <Wrap30>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Поле не заполнено",
                    },
                  ]}
                  style={{ maxWidth: "100%" }}
                  name="comment"
                >
                  <TextArea autoSize style={{ width: "100%" }} />
                </Form.Item>
              </Wrap30>

              <br />
              <br />

              <Wrap30 data-font="Wremena" style={{ marginBottom: "24px" }}>
                <h3>6. Сотрудничество и общие вопросы</h3>
              </Wrap30>

              <Wrap30>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Поле не заполнено",
                    },
                  ]}
                  style={{ maxWidth: "100%" }}
                  name="issues_email"
                >
                  <TextArea autoSize style={{ width: "100%" }} />
                </Form.Item>
              </Wrap30>

              <br />
              <br />

              <Wrap30 data-font="Wremena" style={{ marginBottom: "24px" }}>
                <h3>7. Пресса</h3>
              </Wrap30>

              <Wrap30>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Поле не заполнено",
                    },
                  ]}
                  style={{ maxWidth: "100%" }}
                  name="press_email"
                >
                  <TextArea autoSize style={{ width: "100%" }} />
                </Form.Item>
              </Wrap30>

              <br />
              <br />

              <Wrap30 data-font="Wremena" style={{ marginBottom: "24px" }}>
                <h3>8. Работа в «Резерве»</h3>
              </Wrap30>

              <LabelRow>
                <Text14 data-font="wremena">8.1 Основной комментарий</Text14>
              </LabelRow>

              <Wrap30>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Поле не заполнено",
                    },
                  ]}
                  style={{ maxWidth: "100%" }}
                  name="hunt_description"
                >
                  <TextArea autoSize style={{ width: "100%" }} />
                </Form.Item>
              </Wrap30>

              <LabelRow>
                <Text14 data-font="wremena">8.2 email</Text14>
              </LabelRow>

              <Wrap30>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Поле не заполнено",
                    },
                  ]}
                  style={{ maxWidth: "100%" }}
                  name="hunt_email"
                >
                  <TextArea autoSize style={{ width: "100%" }} />
                </Form.Item>
              </Wrap30>

              <br />
              <br />

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
    </>
  );
};

export default ContactsPage;
