import { useState } from "react";
import styled from "styled-components";
import { Select, Input, Space, Row, Col, AutoComplete } from "antd";

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
  Wrap16,
} from "../common/text";

const FilterWrapper = styled(Space)`
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  z-index: 9900;
  opacity: 0;

  animation: FiltersAppear 1s ease-in-out 4s;
  @keyframes FiltersAppear {
    0% {
      opacity: 0;
      transform: translateX(-50%) translateY(-50%);
    }

    100% {
      opacity: 1;
      transform: translateX(-50%);
    }
  }

  animation-fill-mode: forwards;
`;

const Filters = styled(Space)`
  background: white;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 4px;
  padding-right: 4px;
  border-radius: 60px;
  border: 1px solid black;
  position: relative;

  &&&[data-block="filter"] {
    margin-left: 40px;
  }

  &&&&[data-theme="black"] {
    background: black;

    &::before {
      width: calc(100% + 2px);
      height: 100%;
      transform: translateY(-50%);
      z-index: 500;
      background: black;
      content: "";
      position: absolute;
      margin-left: -5px;
    }

    & * {
      color: white;
      z-index: 501;
    }
  }
`;

const FLink = styled.div`
  && {
    cursor: pointer;

    & {
      padding-left: 30px;
      padding-right: 30px;
      padding-top: 4px;
      padding-bottom: 4px;
      border-radius: 60px;
    }

    &:hover {
      background-color: rgba(0, 0, 0, 0.2);
    }

    &[data-type="link"] {
      background-color: black;
      color: white;
    }

    &[data-type="notfilter"] {
      opacity: 0.6;
    }

    &[data-theme="black"] {
      color: white;
      border: 1px solid rgba(255, 255, 255, 0.8);
    }

    &[data-theme="black"]:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }

    &[data-status="active"] {
      background-color: rgba(255, 255, 255, 0.5) !important;
    }

    &[data-status="active"]:hover {
      background-color: rgba(255, 255, 255, 0.5) !important;
    }
  }
`;

const BlackPanel = styled.div`
  position: absolute;
  width: 90%;
  padding: 20px;
  height: auto;
  min-height: 200px;
  background: black;
  border-radius: 25px 25px 0px 25px;
  right: 0;
  bottom: calc(100% + 4px);

  && * {
    color: white;
  }
`;

const BlackRow = styled(Row)`
  && > *[data-theme="black"] {
    margin-right: 6px;
    margin-bottom: 10px;
  }
`;

const LabelRow = styled(Row)`
  margin-bottom: 24px;
  opacity: 0.6;
`;

const AutoCompleteSearch = styled(AutoComplete)`
  width: 100%;

  &&& .ant-select-selector {
    background-color: black;
    height: 50px;
    display: flex;
    align-items: center;
    border-radius: 0px;
    border-left: 0px;
    border-top: 0px;
    border-right: 0px;
  }

  &&& .ant-select-selection-search {
    display: flex;
    align-items: center;
  }
`;
const AutoCompleteWrapper = styled(Wrap24)`
  width: 100%;
`;

const CloseBtnCol = styled(Col)`
  cursor: pointer;

  &:hover div {
    text-decoration: underline;
  }
`;


/**
 *
 * Фильтр "Направления"
 */

const DirsTags = [
  "Все",
  "Жилые объекты",
  "Офисно-административные объекты",
  "Торговые объекты",
  "Объекты культуры",
  "Объекты инфраструктуры и транспорта",
  "Смешанная функция",
  "Градостроительные концепции",
  "Текущие объекты",
  "Конкурсные проекты",
  "Арт-объекты и дизайн",
];

const DirectionsFilter = ({ setFilterType }) => {
  const [DirItems, selDirItems] = useState([0]);

  const updateDir = (item) => {
    if (item === 0) {
      selDirItems([0]);
      return true;
    }

    if (!DirItems.includes(item)) {
      let _DirItems = DirItems[0] === 0 ? [] : [...DirItems];
      _DirItems.push(item);

      selDirItems(_DirItems);
    }
  };

  return (
    <BlackPanel>
      <Col>
        <LabelRow justify="space-between">
          <Col>
            <Wrap16 data-font="wremena">
              Вы можете выбрать несколько категорий одновременнно
            </Wrap16>
          </Col>
          <CloseBtnCol onClick={() => setFilterType(null)}>
            <Wrap16 data-font="ibm">Свернуть</Wrap16>
          </CloseBtnCol>
        </LabelRow>
        <BlackRow>
          {DirsTags.map((key, i) => (
            <FLink
              data-theme="black"
              key={`FilterDir${i}`}
              onClick={() => updateDir(i)}
              data-status={DirItems.includes(i) && "active"}
            >
              <Text24>{key}</Text24>
            </FLink>
          ))}
        </BlackRow>
      </Col>
    </BlackPanel>
  );
};

let YearsTags = ["Все"];

for (let i = 2021; i >= 2000; i--) {
  YearsTags.push(i);
}

const YearsFilter = ({ setFilterType }) => {
  const [YearItems, selYearItems] = useState([0]);

  const updateYear = (item) => {
    if (item === 0) {
      selYearItems([0]);
      return true;
    }

    if (!YearItems.includes(item)) {
      let _YearItems = YearItems[0] === 0 ? [] : [...YearItems];
      _YearItems.push(item);

      selYearItems(_YearItems);
    }
  };

  return (
    <BlackPanel>
      <Col>
        <LabelRow justify="space-between">
          <Col>
            <Wrap16 data-font="wremena">
              Вы можете выбрать несколько категорий одновременнно
            </Wrap16>
          </Col>
          <CloseBtnCol onClick={() => setFilterType(null)}>
            <Wrap16 data-font="ibm">Свернуть</Wrap16>
          </CloseBtnCol>
        </LabelRow>
        <BlackRow>
          {YearsTags.map((key, i) => (
            <FLink
              data-theme="black"
              key={`filterYear${i}`}
              onClick={() => updateYear(i)}
              data-status={YearItems.includes(i) && "active"}
            >
              <Text24>{key}</Text24>
            </FLink>
          ))}
        </BlackRow>
      </Col>
    </BlackPanel>
  );
};

/**
 * Компонент "Поиск"
 */

const options = [];

const SearchFilter = ({ setFilterType }) => {
  return (
    <BlackPanel>
      <Col>
        <LabelRow justify="space-between">
          <Col>
            <Wrap16 data-font="wremena">
              Вы можете выбрать несколько категорий одновременнно
            </Wrap16>
          </Col>
          <CloseBtnCol onClick={() => setFilterType(null)}>
            <Wrap16 data-font="ibm">Свернуть</Wrap16>
          </CloseBtnCol>
        </LabelRow>
        <BlackRow>
          <AutoCompleteWrapper>
            <AutoCompleteSearch
              options={options}
              placeholder="Попробуйте ввести ключевое слово"
              filterOption={(inputValue, option) =>
                option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
                -1
              }
            />
          </AutoCompleteWrapper>
        </BlackRow>
      </Col>
    </BlackPanel>
  );
};

/**
 *
 * Компонент "Плавающие фильтры"
 *
 */

const FloatFilters = ({
  setLayoutType,
  LayoutType,
  setGalleryAnimation,
  FilterType,
  setFilterType,
}) => {
  return (
    <FilterWrapper>
      {
        /**
         * Фильтр "Направления"
         */
        FilterType === 1 && <DirectionsFilter {...{ setFilterType }} />
      }
      {
        /**
         * Фильтр "Года"
         */
        FilterType === 2 && <YearsFilter {...{ setFilterType }} />
      }
      {
        /**
         * Фильтр "Года"
         */
        FilterType === 3 && <SearchFilter {...{ setFilterType }} />
      }

      <Filters size={0}>
        <FLink
          data-type={LayoutType === 1 && "link"}
          onClick={() => {
            setGalleryAnimation(false);
            setLayoutType(1);
          }}
        >
          <Text24>Галерея</Text24>
        </FLink>
        <FLink
          data-type={LayoutType === 0 && "link"}
          onClick={() => {
            setGalleryAnimation(false);
            setLayoutType(0);
          }}
        >
          <Text24>Список</Text24>
        </FLink>
        <FLink
          data-type={LayoutType === 2 && "link"}
          onClick={() => {
            setGalleryAnimation(false);
            setLayoutType(2);
          }}
        >
          <Text24>Карта</Text24>
        </FLink>
      </Filters>

      <Filters
        size={0}
        data-block="filter"
        data-theme={FilterType !== null && "black"}
      >
        <FLink
          data-type={FilterType !== null && FilterType !== 1 && "notfilter"}
          onClick={() => setFilterType(1)}
        >
          <Text24>Направления</Text24>
        </FLink>
        <FLink
          data-type={FilterType !== null && FilterType !== 2 && "notfilter"}
          onClick={() => setFilterType(2)}
        >
          <Text24>Год</Text24>
        </FLink>
        <FLink
          data-type={FilterType !== null && FilterType !== 3 && "notfilter"}
          onClick={() => setFilterType(3)}
        >
          <Text24>Поиск</Text24>
        </FLink>
      </Filters>
    </FilterWrapper>
  );
};

export default FloatFilters;
