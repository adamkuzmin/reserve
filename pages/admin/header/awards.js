import AdminWrapper from "@/Components/Admin/admin-wrapper/admin-wrapper";
import { AwardsHeaderQuery } from "@/Components/Admin/queries/__queries";
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

const VacanciesHeader = () => {
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
    const query = AwardsHeaderQuery;

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
                <h3>Верхняя шапка раздела "Награды"</h3>
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
                  <Text14>1.1 Контент</Text14>
                </LabelRow>
                <Wrap30>
                  <Form.Item style={{ width: "100%" }} name="description">
                    <TextArea autoSize />
                  </Form.Item>
                </Wrap30>

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
          </>
        )}
      </AdminWrapper>
    </>
  );
};

export default VacanciesHeader;
