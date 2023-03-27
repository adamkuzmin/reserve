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

const columns = (handleDelete = () => {}) => [
  {
    title: "Название",
    dataIndex: "name",
    width: "40%",
    key: "name",
    render: (a, { _id }) => (
      <Link href={`/admin/partner/${_id}`}>
        <StyledText data-type="link" data-weight="semibold" data-font="ibm">
          {a}
        </StyledText>
      </Link>
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

const Partners = ({ data }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const setLogId = useStore(({ setLogId }) => setLogId);

  const deleteProject = async (project_id) => {
    setIsDeleting(true);

    try {
      await sanity.delete(project_id);

      notification.success({ message: `Партнер удален!`, placement: "bottom" });
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

export default Partners;
