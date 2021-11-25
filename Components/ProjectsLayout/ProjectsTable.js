import styled from "styled-components";

import { Table, Input, Button, Space } from "antd";

import {
  Text254,
  Text96,
  Text60,
  Text48,
  Text40,
  Text36,
  Text30,
  Text24,
  Wrap24,
} from "../common/text";

const TableWrapper = styled.div`
  width: 100%;
`;

const CatsArray = styled.div`
  && > * + * {
    &::before {
      content: ", ";
    }
  }
`;

const StyledText = styled(Text24)`
  && {
    line-height: 1.33;
    letter-spacing: -0.01em;
    font-weight: 400;
  }

  &&[data-weight="semibold"] {
    font-weight: 600;
  }
`;

const PTable = styled(Table)`
  &&& .ant-table-tbody > tr > td {
    border-bottom: 1px solid black;
  }

  &&& .ant-table-column-sorter, &&& .ant-table-filter-trigger {
    color: black
  }

  &&& .ant-table-thead > tr > th {
    border-bottom: 1px solid black;
    background: white;
  }

  &&& th {
    font-weight: 300;
    padding-bottom: 3px;

    &::before {
      width: 0px !important
    }
  }

  &&& th,
  &&& td {
    padding-left: 0px;
    cursor: pointer;
    transition: all 0.6s cubic-bezier(0.19, 1, 0.22, 1);
  }

  &&& tr:hover > td:nth-child(2) {
    padding-left: 40px
  }
`;

const data = [
  {
    key: 1,
    year: 2020,
    name: "Комплекс апартаментов STORY",
    location: "Москва",
    categories: ["Жилые объекты", "ритейл"],
    status: "Построен",
  },
  {
    key: 2,
    year: 2020,
    name: "Больница с родильным домом в Коммунарке",
    location: "Москва",
    categories: ["Объекты здравоохранения"],
    status: "Построен",
  },
  {
    key: 3,
    year: 2020,
    name: "Реконструкция площади В. И. Ленина",
    location: "Якутск",
    categories: ["Общественные пространства"],
    status: "Конкурс",
  },
  {
    key: 4,
    year: 2018,
    name: "Административно-деловой центр ТиНАО",
    location: "Москва",
    categories: ["Офисно-административные объекты"],
    status: "Построен",
  },
  {
    key: 5,
    year: 2020,
    name: "ЖК «Небо»",
    location: "Москва",
    categories: ["Жилые объекты", "ритейл"],
    status: "Построен",
  },
  {
    key: 6,
    year: 2019,
    name: "ЖК «Небо»",
    location: "Москва",
    categories: ["Жилые объекты", "ритейл"],
    status: "Построен",
  },
  {
    key: 7,
    year: 2018,
    name: "Московский концертный зал «Зарядье»",
    location: "Москва",
    categories: ["Объекты культуры", "концертный зал", "многофункциональный"],
    status: "Построен",
  },
  {
    key: 8,
    year: 2021,
    name: "ЖК «Небо»",
    location: "Москва",
    categories: ["Жилые объекты", "ритейл"],
    status: "Построен",
  },
  {
    key: 9,
    year: 2015,
    name: "Жилой комплекс Триколор",
    location: "Москва",
    categories: ["Жилые объекты", "ритейл"],
    status: "Построен",
  },
  {
    key: 10,
    year: 2016,
    name: "Многофункциональный комплекс в Москва-сити",
    location: "Москва",
    categories: ["Жилые объекты", "ритейл"],
    status: "Построен",
  },
  {
    key: 11,
    year: 2021,
    name: "ЖК «Небо»",
    location: "Москва",
    categories: ["Жилые объекты", "ритейл"],
    status: "Построен",
  },
  {
    key: 12,
    year: 2021,
    name: "Жилой комплекс «Золотая Звезда»",
    location: "Москва",
    categories: ["Жилые объекты", "ритейл"],
    status: "Построен",
  },
  {
    key: 13,
    year: 2021,
    name: "Жилой комплекс «Лица»",
    location: "Москва",
    categories: ["Жилые объекты", "ритейл"],
    status: "Построен",
  },
  {
    key: 14,
    year: 2021,
    name: "Серый пояс. Преобразование",
    location: "Москва",
    categories: ["Жилые объекты", "ритейл"],
    status: "Построен",
  },
];

const ProjectsTable = () => {
  const columns = [
    {
      title: "Год",
      dataIndex: "year",
      key: "year",
      width: "7%",
      render: (a) => <StyledText data-font="ibm">{a}</StyledText>,
      sorter: (a, b) => a.year - b.year,
    },
    {
      title: "Название",
      dataIndex: "name",
      width: "40%",
      key: "name",
      render: (a) => (
        <StyledText data-weight="semibold" data-font="ibm">
          {a}
        </StyledText>
      ),
    },
    {
      title: "Место",
      dataIndex: "location",
      key: "location",
      width: "18%",
      render: (a) => <StyledText data-font="ibm">{a}</StyledText>,
    },
    {
      title: "Программа",
      dataIndex: "categories",
      key: "categories",
      width: "27%",
      render: (a) => (
        <CatsArray>
          {a.map((key, i) => (
            <StyledText data-font="ibm" key={`catTable${i}`}>
              {key}
            </StyledText>
          ))}
        </CatsArray>
      ),
    },
    {
      title: "Статус",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "Построен", value: "Построен" },
        { text: "Конкурс", value: "Конкурс" },
      ],
      onFilter: (value, record) => record.status.includes(value),
      width: "8%",
      render: (a) => <StyledText data-font="ibm">{a}</StyledText>,
    },
  ];

  return (
    <Wrap24 swidth={'100%'}>
      <TableWrapper>
        <PTable columns={columns} dataSource={data} showSizeChanger={false} pagination={{ pageSize: 100 }}/>
      </TableWrapper>
    </Wrap24>
  );
};

export default ProjectsTable;
