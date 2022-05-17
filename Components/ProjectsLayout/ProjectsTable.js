import styled from "styled-components";
import { useContext, useEffect, useState } from "react";

import { Table, Typography, Skeleton, Space, Grid } from "antd";

import { MouseContext } from "../common/Cursor/mouse-context";
import { projectData } from "./data/data";

import Link from "next/link";

import stc from "string-to-color";

import { Text24, Wrap24, Text14 } from "../common/text";
const { useBreakpoint } = Grid;

const { Paragraph, Text } = Typography;

const TableWrapper = styled.div`
  width: 100%;

  @media (max-width: 576px) {
    &&&& {
      width: calc(100vw - 40px);
    }
  }
`;

const CatsArray = styled.div`
  && > * + * {
    &::before {
      content: ", ";
    }
  }
`;

const StyledText = styled(Text24)`
  &&[data-type="link"]:hover {
    text-decoration: underline;
  }

  && {
    line-height: 1.33;
    letter-spacing: -0.01em;
    font-weight: 400;
  }

  &&[data-weight="semibold"] {
    font-weight: 600;
  }
`;

const MobileText = styled(Text14)`
  &&&& {
    font-size: 14px !important;
    line-height: 1.25 !important;
  }

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

const SmallPick = styled.div`
  min-width: 8px;
  min-height: 8px;
  margin-right: 5px;

  background: ${({ color }) => (color ? color : "black")};
  transform: rotate(45deg);
  filter: brightness(1.75);
`;

const mobileColumns = [
  {
    title: <MobileText data-font="ibm">Название</MobileText>,
    dataIndex: "nameru",
    key: "name",
    width: "80%",
    render: (a) => <MobileText data-font="ibm">{a}</MobileText>,
  },
  {
    title: <MobileText data-font="ibm">Год</MobileText>,
    dataIndex: "finished",
    key: "finished",
    width: "20%",
    render: (a) => <MobileText data-font="ibm">{a}</MobileText>,
  },
];

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
      <Link href="/project">
        <StyledText data-type="link" data-weight="semibold" data-font="ibm">
          {a}
        </StyledText>
      </Link>
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
      if (office) categories.push("Офисно-административные");
      if (trading) categories.push("Торговые объекты");
      if (culture) categories.push("Объекты культуры");
      if (transport) categories.push("Инфрастуктура / транспорт");
      if (mixed) categories.push("Смешанная функция");
      if (urban) categories.push("Градостроительные концепции");
      if (current) categories.push("Текущие объекты");
      if (competition) categories.push("Конкурсные проекты");
      if (art) categories.push("Арт-объекты и дизайн");

      return (
        <CatsArray>
          <StyledText data-font="ibm">
            <Space direction="vertical" size={3}>
              {categories.splice(0, 2).map((category, i) => (
                <Space>
                  <SmallPick color={stc(category)} />
                  <Paragraph key={`parCat:${i}`} style={{ marginBottom: "0" }}>
                    {category}
                  </Paragraph>
                </Space>
              ))}
            </Space>
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
  const screens = useBreakpoint();

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
              const { coververt, coverhor } = record;
              const cover = rowIndex % 2 === 0 ? coververt : coverhor;
              const coverClass =
                rowIndex % 2 === 0 ? "renderHor-1" : "renderVer-3";

              const metaSrc = cover ? `/projects/Frame%20${cover}.jpg` : "";

              return {
                onMouseEnter: () =>
                  cursorChangeHandler({ url: metaSrc, coverClass }),
                onMouseLeave: () => cursorChangeHandler(null),
                onClick: () => cursorChangeHandler(null),
              };
            }}
            columns={screens.md ? columns : mobileColumns}
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
