import AdminWrapper from "@/Components/Admin/admin-wrapper/admin-wrapper";
import { SocialNetsQuery } from "@/Components/Admin/queries/__queries";
import { sanity } from "@/Components/Client/sanity/sanity-client";
import { Form, Select, notification } from "antd";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "antd/lib/form/Form";
import ImageSingleUploader from "@/Components/Admin/project/a-common/blocks/image-single-upload";
import TextArea from "antd/lib/input/TextArea";
import { LabelRow } from "@/Components/Filters/styles";
import { Text14, Text36, Wrap30 } from "@/Components/common/text";
import { WideButton } from "@/Components/ProjectInfo/ProjectBottom";

const { Option } = Select;

const SocialNets = () => {
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
    const query = SocialNetsQuery;

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

  const [form] = useForm();

  const options = [
    { value: "telegram", label: "telegram" },
    { value: "vk", label: "vk" },
    { value: "facebook", label: "facebook" },
    { value: "instagram", label: "instagram" },
    { value: null, label: "(Не выбрано)" },
  ];

  return (
    <>
      <AdminWrapper>
        {isFetched && initialValues && (
          <>
            <Form
              form={form}
              layout="vertical"
              style={{ width: "100%" }}
              onFinish={handleFinish}
              initialValues={initialValues}
            >
              <Wrap30 data-font="Wremena" style={{ marginBottom: "24px" }}>
                <h3>Соцсеть #1</h3>
              </Wrap30>

              <div
                style={{
                  width: "100%",
                  maxWidth: "700px",
                  display: "flex",
                  flexDirection: "column",
                }}
                layout="vertical"
              >
                <LabelRow>
                  <Text14>1.1 Название соц. сети</Text14>
                </LabelRow>
                <Form.Item style={{ width: "300px" }} name="type1">
                  <Select>
                    {options.map((option) => (
                      <Option key={option.value} value={option.value}>
                        {option.label}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <LabelRow>
                  <Text14>1.2 Ссылка на соц. сеть</Text14>
                </LabelRow>
                <Form.Item style={{ width: "100%" }} name="url1">
                  <TextArea autoSize />
                </Form.Item>

                <LabelRow>
                  <Text14>1.3 Изображение для карточки</Text14>
                </LabelRow>
                <Form.Item
                  style={{ width: "100%", maxWidth: "300px" }}
                  name="image1"
                >
                  <ImageSingleUploader label="" />
                </Form.Item>
              </div>

              <br />
              <br />

              {/* 2 */}
              <Wrap30 data-font="Wremena" style={{ marginBottom: "24px" }}>
                <h3>Соцсеть #2</h3>
              </Wrap30>

              <div
                style={{
                  width: "100%",
                  maxWidth: "700px",
                  display: "flex",
                  flexDirection: "column",
                }}
                layout="vertical"
              >
                <LabelRow>
                  <Text14>2.1 Название соц. сети</Text14>
                </LabelRow>
                <Form.Item style={{ width: "300px" }} name="type2">
                  <Select>
                    {options.map((option) => (
                      <Option key={option.value} value={option.value}>
                        {option.label}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <LabelRow>
                  <Text14>2.2 Ссылка на соц. сеть</Text14>
                </LabelRow>
                <Form.Item style={{ width: "100%" }} name="url2">
                  <TextArea autoSize />
                </Form.Item>

                <LabelRow>
                  <Text14>2.3 Изображение для карточки</Text14>
                </LabelRow>
                <Form.Item
                  style={{ width: "100%", maxWidth: "300px" }}
                  name="image2"
                >
                  <ImageSingleUploader label="" />
                </Form.Item>
              </div>

              <br />
              <br />

              {/* 3 */}
              <Wrap30 data-font="Wremena" style={{ marginBottom: "24px" }}>
                <h3>Соцсеть #3 (Опционально)</h3>
              </Wrap30>

              <div
                style={{
                  width: "100%",
                  maxWidth: "700px",
                  display: "flex",
                  flexDirection: "column",
                }}
                layout="vertical"
              >
                <LabelRow>
                  <Text14>3.1 Название соц. сети</Text14>
                </LabelRow>
                <Form.Item style={{ width: "300px" }} name="type3">
                  <Select>
                    {options.map((option) => (
                      <Option key={option.value} value={option.value}>
                        {option.label}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <LabelRow>
                  <Text14>3.2 Ссылка на соц. сеть</Text14>
                </LabelRow>
                <Form.Item style={{ width: "100%" }} name="url3">
                  <TextArea autoSize />
                </Form.Item>

                <LabelRow>
                  <Text14>3.3 Изображение для карточки</Text14>
                </LabelRow>
                <Form.Item
                  style={{ width: "100%", maxWidth: "300px" }}
                  name="image3"
                >
                  <ImageSingleUploader label="" />
                </Form.Item>
              </div>

              <br />
              <br />

              {/* 4 */}
              <Wrap30 data-font="Wremena" style={{ marginBottom: "24px" }}>
                <h3>Соцсеть #4 (Опционально)</h3>
              </Wrap30>

              <div
                style={{
                  width: "100%",
                  maxWidth: "700px",
                  display: "flex",
                  flexDirection: "column",
                }}
                layout="vertical"
              >
                <LabelRow>
                  <Text14>4.1 Название соц. сети</Text14>
                </LabelRow>
                <Form.Item style={{ width: "300px" }} name="type4">
                  <Select>
                    {options.map((option) => (
                      <Option key={option.value} value={option.value}>
                        {option.label}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <LabelRow>
                  <Text14>4.2 Ссылка на соц. сеть</Text14>
                </LabelRow>
                <Form.Item style={{ width: "100%" }} name="url4">
                  <TextArea autoSize />
                </Form.Item>

                <LabelRow>
                  <Text14>4.3 Изображение для карточки</Text14>
                </LabelRow>
                <Form.Item
                  style={{ width: "100%", maxWidth: "300px" }}
                  name="image4"
                >
                  <ImageSingleUploader label="" />
                </Form.Item>
              </div>

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
            </Form>
          </>
        )}
      </AdminWrapper>
    </>
  );
};

export default SocialNets;
