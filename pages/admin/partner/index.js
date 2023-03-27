import { Text48, Wrap30 } from "@/Components/common/text";
import { WideButton } from "@/Components/ProjectInfo/ProjectBottom";

import { Form, Input, notification } from "antd";
import { useRouter } from "next/router";
import { useState } from "react";
import AdminWrapper from "../../../Components/Admin/admin-wrapper/admin-wrapper";
import Nav from "../../../Components/Admin/project/nav/nav";
import { sanity } from "@/Components/Client/sanity/sanity-client";
import { useStore } from "@/Store/useStore";

import moment from "moment/moment";
import { Gap } from "@/Components/About/common/styles";

const PartnerPage = ({ id, mode, initialValues }) => {
  const [section, setSection] = useState("common");
  const router = useRouter();

  const setLogId = useStore(({ setLogId }) => setLogId);

  const cfgs = {
    onCompleted: () => {
      setLogId();
      notification.success({
        message: `Данные сохранились!`,
        placement: "bottom",
      });

      router.push(`/admin/partners`, null, { shallow: false });
    },
    onError: (e) => {
      console.log("e", e);

      setLogId();
      notification.error({
        message: `Ошибка!`,
        placement: "bottom",
      });

      router.push(`/admin/partners`, null, { shallow: false });
    },
  };

  const addProject = async (e) => {
    const data = { ...e, cr: moment().toISOString(), _type: "partners" };

    try {
      await sanity.create(data);
      cfgs.onCompleted();
    } catch (err) {
      cfgs.onError();
    }
  };

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
    if (!e) return;

    if (mode === "new") {
      addProject(e);
    } else if (mode === "edit") {
      editProject(e, id);
    }
  };

  if (!id) return <></>;

  return (
    <>
      <AdminWrapper panel={<Nav {...{ section, setSection }} />}>
        <Form
          layout="vertical"
          style={{ width: "100%" }}
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
            <Wrap30 data-font="Wremena">
              <h3>1. Имя партнера / заказчика</h3>
            </Wrap30>

            <Wrap30>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Поле не заполнено",
                  },
                ]}
                name="name"
              >
                <Input placeholder="К примеру: ОАО «Авгур Эстейт»" />
              </Form.Item>
            </Wrap30>

            <Gap sheight={"36px"} />

            <Wrap30 data-font="Wremena">
              <h3>2. Город / Страна</h3>
            </Wrap30>

            <Wrap30>
              <Form.Item
                style={{ marginLeft: "10px", width: "100%" }}
                name="location"
                rules={[
                  {
                    required: true,
                    message: "Поле не заполнено",
                  },
                ]}
              >
                <Input placeholder="Москва" />
              </Form.Item>
            </Wrap30>

            <Gap sheight={"36px"} />

            <Wrap30 data-font="Wremena">
              <h3>3. Отзыв</h3>
            </Wrap30>

            <Wrap30>
              <Form.Item
                style={{ marginLeft: "10px", width: "100%" }}
                name="review"
                rules={[
                  {
                    required: true,
                    message: "Поле не заполнено",
                  },
                ]}
              >
                <Input.TextArea autosize placeholder="Любой отзыв..." />
              </Form.Item>
            </Wrap30>

            <Form.Item>
              <WideButton
                style={{ background: "black", color: "white" }}
                htmlType="submit"
              >
                <Text48>Сохранить изменения</Text48>
              </WideButton>
            </Form.Item>
          </div>
        </Form>
      </AdminWrapper>
    </>
  );
};

export default PartnerPage;
