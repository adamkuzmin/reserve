import React from "react";
import styled from "styled-components";
import { useStore } from "../../Store/useStore";

import { Col, AutoComplete } from "antd";
import { FLink, BlackPanel, BlackRow, LabelRow, CloseBtnCol } from "./styles";
import { Text24, Wrap24, Wrap16 } from "../common/text";

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

/* * Фильтр "Направления"*/
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

const DirectionsFilter = ({
  setFilterType,
  DirItems,
  selDirItems,
  toPageTop,
}) => {
  const setAnimatedGallery = useStore((state) => state.setAnimatedGallery);

  const updateDir = (item) => {
    if (item === 0) {
      selDirItems([0]);
      return true;
    }

    if (DirItems.includes(item)) {
      selDirItems((state) => state.filter((_item) => _item !== item));
      return;
    }

    if (!DirItems.includes(item)) {
      let _DirItems = DirItems[0] === 0 ? [] : [...DirItems];
      _DirItems.push(item);

      selDirItems(_DirItems);
      return;
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
              onClick={() => {
                setAnimatedGallery(false);
                toPageTop();

                updateDir(i);
              }}
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

const YearsFilter = ({ setFilterType, toPageTop, YearItems, selYearItems }) => {
  const setAnimatedGallery = useStore((state) => state.setAnimatedGallery);

  const updateYear = (item) => {
    if (item === 0) {
      selYearItems([0]);
      return true;
    }

    if (YearItems.includes(item)) {
      selYearItems((state) => state.filter((_item) => _item !== item));
      return;
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
              onClick={() => {
                setAnimatedGallery(false);
                toPageTop();

                updateYear(key === "Все" ? i : key);
              }}
              data-status={
                YearItems.includes(key === "Все" ? i : key) && "active"
              }
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

export { DirectionsFilter, YearsFilter, SearchFilter };
