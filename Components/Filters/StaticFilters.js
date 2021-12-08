import { useState } from "react";
import styled from "styled-components";
import { Select, Input } from "antd";

const { Option } = Select;

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

const CategoriesList = [
  { name: "Все", value: 0 },
  { name: "Жилые объекты", value: 1 },
  { name: "Офисно-административные объекты", value: 2 },
  { name: "Торговые объекты", value: 3 },
  { name: "Объекты культуры", value: 4 },
  { name: "Объекты инфраструктуры и транспорта", value: 5 },
  { name: "Смешанная функция", value: 6 },
  { name: "Градостроительные концепции", value: 7 },
  { name: "Построенные объекты", value: 8 },
  { name: "Текущие объекты", value: 9 },
  { name: "Конкурсные проекты", value: 10 },
  { name: "Арт-объекты и дизайн", value: 11 },
];

let YearsList = [];
for (let i = 2000; i <= 2021; i++) {
  YearsList.push({ name: i, value: i });
}

const FilterWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Filters = styled.div`
  display: flex;
  align-items: start;
  margin-bottom: 3.3vw;
`;

Filters.Categories = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

Filters.CatItem = styled.div`
  &&::after {
    content: "|";
    font-size: 24px;
    color: #9d9d9d;
    margin-left: 8px;
    margin-right: 8px;
  }

  && a[data-status="noactive"] {
    color: #a7a7a7;
  }
`;

Filters.Years = styled.div`
  min-width: 16.7vw;
  width: 100%;
  max-width: 16.7vw;
`;

const SearchField = styled.div`
  && {
    border-bottom: 1px solid black;
    margin-right: 8vw;
  }

  &&& .ant-input {
    width: 46vw;
    display: flex;
    align-items: center;
    height: 40px;
    font-size: 30px;
  }

  &&& .ant-input::placeholder {
    font-weight: 300;
  }

  &&::after {
    content: "";
    width: 40px;
    height: 40px;
  }

  &&& .ant-input,
  && .ant-input:focus,
  && .ant-input-focused {
    border: 0px;
    box-shadow: none;
    padding-left: 0px;
  }
`;

Filters.LayoutType = styled.div`
  display: flex;

  && > * + * {
    margin-left: 5vw;
  }

  && a {
    color: black;
  }
`;

Filters.LayoutTypeItem = styled(Text24)`
  &&[data-status="noactive"] {
    border-bottom: 1px solid black;
  }

  &&:hover {
    border-bottom: 1px solid white;
  }
`;

const StyledSelect = styled(Select)`
  && .ant-select-selector {
    border: 0px;
  }
`;

const LayoutTypeList = [
  { name: "Список", value: 0 },
  { name: "Плитка", value: 1 },
  { name: "Карта", value: 2 },
];

const StaticFilters = ({ LayoutType, setLayoutType }) => {
  const [activeCats, setActiveCats] = useState([0]);

  return (
    <FilterWrapper>
      <Filters>
        <Filters.Categories>
          {CategoriesList.map((key, i) => {
            return (
              <Filters.CatItem key={`filterItem${i}`}>
                <Text24>
                  <a data-font="ibm" data-status="noactive">
                    {key.name}
                  </a>
                </Text24>
              </Filters.CatItem>
            );
          })}
        </Filters.Categories>
        <Filters.Years>
          <Wrap24>
            <StyledSelect defaultValue={"Год"} style={{ width: 120 }}>
              {YearsList.map((key, i) => (
                <Option key={`YearOption${i}`} value={key.value}>
                  <Text24>{key.name}</Text24>
                </Option>
              ))}
            </StyledSelect>
          </Wrap24>
        </Filters.Years>
      </Filters>
      <Filters>
        <Wrap24>
          <SearchField>
            <Input placeholder="Поиск по проектам" />
          </SearchField>
        </Wrap24>
        <Filters.LayoutType>
          {LayoutTypeList.map((key, i) => {
            return (
              <Filters.LayoutTypeItem
                key={`LayoutType${i}`}
                onClick={() => setLayoutType(key.value)}
                data-status={LayoutType === i ? "active" : "noactive"}
              >
                <a>{key.name}</a>
              </Filters.LayoutTypeItem>
            );
          })}
        </Filters.LayoutType>
      </Filters>
    </FilterWrapper>
  );
};

export default StaticFilters;
