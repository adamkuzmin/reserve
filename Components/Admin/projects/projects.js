import { Text24, Wrap24 } from "@/Components/common/text";
import {
  PTable,
  StyledText,
  TableWrapper,
} from "@/Components/ProjectsLayout/ProjectsTable";
import { Space } from "antd";
import Link from "next/link";
import { DELETE_PROJECT } from "../project/__queries";
import client from "@/Components/Client/apollo/apollo-client";
import { useMutation } from "@apollo/client";
import { getProjectsHub } from "@/pages/admin/projects";

const columns = (handleDelete = () => {}) => [
  {
    title: "Название",
    dataIndex: "name",
    width: "40%",
    key: "name",
    render: (a, { id }) => (
      <Link href={`/admin/project/${id}`}>
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
    render: (a, { id }) => (
      <Space>
        <Text24
          style={{ cursor: "pointer", color: "red", fontWeight: "400" }}
          data-type="link"
          data-weight="semibold"
          data-font="ibm"
          onClick={() => handleDelete({ variables: { project_id: id } })}
        >
          Удалить
        </Text24>
      </Space>
    ),
  },
];

const Projects = ({ data }) => {
  const [deleteProject] = useMutation(DELETE_PROJECT, {
    client,
    refetchQueries: [{ query: getProjectsHub }, "getProjects"],
  });

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

export default Projects;
