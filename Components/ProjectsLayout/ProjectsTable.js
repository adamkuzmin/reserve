import styled from "styled-components";
import { useContext, useEffect, useState } from "react";

import { Table, Typography, Skeleton } from "antd";

import { MouseContext } from "../common/Cursor/mouse-context";
import { projectData } from "./data/data";

import { Text24, Wrap24 } from "../common/text";

const { Paragraph, Text } = Typography;

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

  &&& .ant-table-column-sorter,
  &&& .ant-table-filter-trigger {
    color: black;
  }

  &&& .ant-table-thead > tr > th {
    border-bottom: 1px solid black;
    background: white;
  }

  &&& th {
    font-weight: 300;
    padding-bottom: 3px;

    &::before {
      width: 0px !important;
    }
  }

  &&& th,
  &&& td {
    padding-left: 0px;
    cursor: pointer;
    transition: all 0.6s cubic-bezier(0.19, 1, 0.22, 1);
  }

  &&& tr:hover > td:nth-child(2) {
    padding-left: 40px;
  }
`;

const SkeletonWrapper = styled.div`
  min-width: 100%;

  && * {
    min-width: 100%;
  }
`;

const columns = [
  {
    title: "Год",
    dataIndex: "finished",
    key: "finished",
    width: "7%",
    render: (a) => <StyledText data-font="ibm">{a}</StyledText>,
    sorter: (a, b) => a.year - b.year,
  },
  {
    title: "Название",
    dataIndex: "nameru",
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
    render: (
      a,
      {
        residential = 0,
        office = 0,
        trading = 0,
        culture = 0,
        transport = 0,
        mixed = 0,
        urban = 0,
        current = 0,
        competition = 0,
        art = 0,
      }
    ) => {
      let categories = [];
      if (residential) categories.push("Жилые объекты");
      if (office) categories.push("Офисно-административные объекты");
      if (trading) categories.push("Торговые объекты");
      if (culture) categories.push("Объекты культуры");
      if (transport) categories.push("Объекты инфраструктуры и транспорта");
      if (mixed) categories.push("Смешанная функция");
      if (urban) categories.push("Градостроительные концепции");
      if (current) categories.push("Текущие объекты");
      if (competition) categories.push("Конкурсные проекты");
      if (art) categories.push("Арт-объекты и дизайн");

      return (
        <CatsArray>
          <StyledText data-font="ibm">
            <Paragraph style={{ marginBottom: "0" }}>
              {categories.reduce((prev, current) => `${prev}, ${current}`)}
            </Paragraph>
          </StyledText>
        </CatsArray>
      );
    },
  },
  {
    title: "Статус",
    dataIndex: "built",
    key: "built",
    filters: [
      { text: "Построен", value: "Построен" },
      { text: "Конкурс", value: "Конкурс" },
    ],
    onFilter: (value, record) => record.status.includes(value),
    width: "8%",
    render: (a) => <StyledText data-font="ibm">{a}</StyledText>,
  },
];

const wireColumns = [
  {
    title: "",
    width: "15%",
    key: "wire1",
    render: () => (
      <SkeletonWrapper>
        <Skeleton.Input size="large" style={{ height: "32px" }} active />
      </SkeletonWrapper>
    ),
  },
  {
    title: "",
    width: "45%",
    key: "wire2",
    render: () => (
      <SkeletonWrapper>
        <Skeleton active title={false} />
      </SkeletonWrapper>
    ),
  },
  {
    title: "",
    width: "20%",
    key: "wire3",
    render: () => (
      <SkeletonWrapper>
        <Skeleton.Input size="default" style={{ height: "24px" }} active />
      </SkeletonWrapper>
    ),
  },
  {
    title: "",
    width: "20%",
    key: "wire4",
    render: () => (
      <SkeletonWrapper>
        <Skeleton.Input size="default" style={{ height: "24px" }} active />
      </SkeletonWrapper>
    ),
  },
];

const ProjectsTable = ({ stateData }) => {
  const { cursorType, cursorChangeHandler } = useContext(MouseContext);
  const [wireMode, setWireMode] = useState(true);

  useEffect(() => {
    setWireMode(true);

    const removeWire = () => setWireMode(false);
    const timer = setTimeout(removeWire, 800);

    return () => {
      clearTimeout(timer);
    };
  }, [stateData]);

  return (
    <Wrap24 swidth={"100%"}>
      <TableWrapper>
        {!wireMode && (
          <PTable
            onRow={(record, rowIndex) => {
              const rowClasses = [
                "renderHor-1",
                "renderHor-2",
                "renderVer-3",
                "renderVer-4",
              ];

              return {
                onMouseEnter: () =>
                  cursorChangeHandler(rowClasses[rowIndex % 4]),
                onMouseLeave: () => cursorChangeHandler(""),
              };
            }}
            columns={columns}
            dataSource={stateData}
            showSizeChanger={false}
            pagination={false}
          />
        )}
        {wireMode && (
          <PTable
            columns={wireColumns}
            dataSource={Array(12).fill(1)}
            showSizeChanger={false}
            pagination={false}
          />
        )}
      </TableWrapper>
    </Wrap24>
  );
};

export default ProjectsTable;
