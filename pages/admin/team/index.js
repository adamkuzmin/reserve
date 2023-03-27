import { Gap } from "@/Components/About/common/styles";
import AdminWrapper from "@/Components/Admin/admin-wrapper/admin-wrapper";
import ImageSingleUploader from "@/Components/Admin/project/a-common/blocks/image-single-upload";
import TeamList from "@/Components/Admin/team/team-list";
import { Text36, Wrap30 } from "@/Components/common/text";
import { WideButton } from "@/Components/ProjectInfo/ProjectBottom";

const { TeamQuery } = require("@/Components/Admin/queries/__queries");
const { sanity } = require("@/Components/Client/sanity/sanity-client");
const { notification, Form, Input } = require("antd");
const { useRouter } = require("next/router");
const { useState, useEffect, useMemo } = require("react");

const Team = () => {
  const [initialValues, setInitialValues] = useState();
  const [initialMembers, setInitialMembers] = useState();
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
    const query = TeamQuery;

    sanity
      .fetch(query)
      .then((data) => {
        const { team, members = [] } = data;

        setInitialValues(team);
        setInitialMembers(members);

        setFetched(true);
      })
      .catch(() => setFetched(true));
  }, []);

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
        <>
          <Form
            layout="vertical"
            style={{ width: "100%", marginTop: "64px" }}
            onFinish={handleFinish}
            initialValues={initialValues}
          >
            <div
              style={{
                border: "1px solid lightgrey",
                padding: "15px",
                width: "100%",
                maxWidth: "700px",
                display: "flex",
                flexDirection: "column",
              }}
              layout="vertical"
            >
              <Wrap30>
                <Form.Item {...{ rules }} name="block1_content">
                  <Input.TextArea autoSize />
                </Form.Item>
              </Wrap30>

              <Wrap30>
                <Form.Item {...{ rules }} name="block1_label">
                  <Input />
                </Form.Item>
              </Wrap30>

              <Wrap30>
                <Form.Item {...{ rules }} name="block1_int">
                  <Input />
                </Form.Item>
              </Wrap30>

              <Gap sheight={"36px"} />
              <Gap sheight={"36px"} />

              <Wrap30>
                <Form.Item {...{ rules }} name="block2_title">
                  <Input />
                </Form.Item>
              </Wrap30>

              <Wrap30>
                <Form.Item {...{ rules }} name="block2_content">
                  <Input.TextArea autoSize />
                </Form.Item>
              </Wrap30>

              <Wrap30>
                <Form.Item {...{ rules }} name="block2_name">
                  <Input />
                </Form.Item>
              </Wrap30>

              <Wrap30>
                <Form.Item {...{ rules }} name="block2_label">
                  <Input />
                </Form.Item>
              </Wrap30>

              <Form.Item style={{ width: "100%" }} name="block2_url">
                <ImageSingleUploader label="Обложка-изображение к биографии" />
              </Form.Item>

              <Gap sheight={"36px"} />

              <Form.Item>
                <WideButton
                  style={{
                    background: "black",
                    color: "white",
                    marginBottom: "0",
                    height: "120px",
                  }}
                  htmlType="submit"
                >
                  <Text36>Сохранить изменения</Text36>
                </WideButton>
              </Form.Item>
            </div>
          </Form>

          <Gap sheight={"64px"} />

          <div
            style={{
              border: "1px solid lightgrey",
              padding: "15px",
              width: "100%",
              maxWidth: "700px",
              display: "flex",
              flexDirection: "column",
            }}
            layout="vertical"
          >
            <TeamList data={initialMembers} />
          </div>
        </>
      )}
    </AdminWrapper>
  );
};

export default Team;
