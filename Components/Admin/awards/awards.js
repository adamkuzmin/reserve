import { Text24, Wrap24 } from "@/Components/common/text";
import {
  PTable,
  StyledText,
  TableWrapper,
} from "@/Components/ProjectsLayout/ProjectsTable";
import { notification, Space, Popconfirm } from "antd";
import Link from "next/link";
import { sanity } from "@/Components/Client/sanity/sanity-client";
import { useState } from "react";
import { useStore } from "@/Store/useStore";
import { Cover } from "./__styled";

const columns = (handleDelete = () => {}) => [
  {
    title: "Награда",
    dataIndex: "cover",
    width: "40%",
    key: "cover",
    render: (a, { _id }) => (
      <Link href={`/admin/award/${_id}`}>
        <Cover url={a} />
      </Link>
    ),
  },
  {
    title: "Год",
    dataIndex: "year",
    width: "20%",
    key: "year",
    render: (a, { _id }) => (
      <StyledText data-type="link" data-weight="semibold" data-font="ibm">
        {a}
      </StyledText>
    ),
  },
  {
    title: "Действия",
    dataIndex: "action",
    width: "10%",
    key: "action",
    render: (a, { _id }) => (
      <Space>
        <Popconfirm
          title="Действительно хотите удалить?"
          onConfirm={() => handleDelete(_id)}
          onCancel={() => {}}
          okText="Да"
          cancelText="Нет"
        >
          <Text24
            style={{ cursor: "pointer", color: "red", fontWeight: "400" }}
            data-type="link"
            data-weight="semibold"
            data-font="ibm"
          >
            Удалить
          </Text24>
        </Popconfirm>
      </Space>
    ),
  },
];

const Awards = ({ data }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  console.log("data", data);

  const setLogId = useStore(({ setLogId }) => setLogId);

  const deleteProject = async (project_id) => {
    setIsDeleting(true);

    try {
      await sanity.delete(project_id);

      notification.success({
        message: `Награда удалена!`,
        placement: "bottom",
      });
      setLogId();
    } catch (err) {
      console.error(err);

      notification.error({
        message: `Ошибка при удалении`,
        placement: "bottom",
      });
    }

    setIsDeleting(false);
  };

  return (
    <>
      <Wrap24 swidth={"100%"}>
        <TableWrapper>
          <PTable
            columns={columns(deleteProject)}
            dataSource={data}
            showSizeChanger={false}
            pagination={false}
          />
        </TableWrapper>
      </Wrap24>
    </>
  );
};

export default Awards;
