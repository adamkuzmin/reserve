import React, { useMemo } from "react";
import styled from "styled-components";
import { useStore } from "../../Store/useStore";

import { Col, AutoComplete, Form, Button } from "antd";
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

  && .ant-select-clear {
    width: 30px;
    height: 30px;
    background: none;
  }
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

const FormBtn = styled(Button)`
  &&&& {
    &,
    &:hover,
    &:focus {
      background: black;
      border-radius: 0;
      border: 1px solid white;
      display: flex;
      align-items: center;
    }
  }
`;

const DirectionsFilter = ({
  setFilterType,
  DirItems,
  selDirItems,
  toPageTop,
  categories = [],
  activeCts = [],
  setActiveCts,
}) => {
  const setAnimatedGallery = useStore((state) => state.setAnimatedGallery);

  const updateDir = (item) => {
    if (item === "Все") {
      setActiveCts([...categories]);
    } else {
      setActiveCts((state = []) => {
        if (state.length === categories.length) return [item];

        if (state.includes(item)) {
          return [...state].filter((s) => s !== item);
        } else {
          state = [...state, item];
          return state;
        }
      });
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
          {["Все", ...categories].map((key, i) => {
            const check =
              (key === "Все" && categories.length === activeCts.length) ||
              (categories.length !== activeCts.length &&
                activeCts.includes(key));

            return (
              <FLink
                data-theme="black"
                key={`FilterDir${i}`}
                onClick={() => {
                  setAnimatedGallery(false);
                  toPageTop();

                  updateDir(key);
                }}
                data-status={check && "active"}
              >
                <Text24>{key}</Text24>
              </FLink>
            );
          })}
        </BlackRow>
      </Col>
    </BlackPanel>
  );
};

let YearsTags = ["Все"];

for (let i = 2021; i >= 2000; i--) {
  YearsTags.push(i);
}

const YearsFilter = ({
  setFilterType,
  toPageTop,
  YearItems,
  selYearItems,
  years = [],
  activeYrs,
  setActiveYrs,
}) => {
  const setAnimatedGallery = useStore((state) => state.setAnimatedGallery);

  const updateYear = (item) => {
    if (item === "Все") {
      setActiveYrs([...years]);
    } else {
      setActiveYrs((state = []) => {
        if (state.length === years.length) return [item];

        if (state.includes(item)) {
          return [...state].filter((s) => s !== item);
        } else {
          state = [...state, item];
          return state;
        }
      });
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
          {["Все", ...years].map((key, i) => {
            const check =
              (key === "Все" && years.length === activeYrs.length) ||
              (years.length !== activeYrs.length && activeYrs.includes(key));

            return (
              <FLink
                data-theme="black"
                key={`filterYear${i}`}
                onClick={() => {
                  setAnimatedGallery(false);
                  toPageTop();

                  updateYear(key);
                }}
                data-status={check && "active"}
              >
                <Text24>{key}</Text24>
              </FLink>
            );
          })}
        </BlackRow>
      </Col>
    </BlackPanel>
  );
};

/**
 * Компонент "Поиск"
 */

const options = [{ label: "Hello", value: "Hello" }];

const SearchFilter = ({
  setFilterType,
  toPageTop,
  search,
  setSearch,
  stateData,
}) => {
  const setAnimatedGallery = useStore((state) => state.setAnimatedGallery);

  const initialValues = useMemo(() => {
    return { search };
  }, [search]);

  const handleFinish = (e) => {
    setAnimatedGallery(false);
    toPageTop();

    const { search } = e;
    setSearch(search);
  };

  return (
    <BlackPanel>
      <Col>
        <LabelRow justify="space-between">
          <Col>
            <Wrap16 data-font="wremena">Поиск по ключевым словам</Wrap16>
          </Col>
          <CloseBtnCol onClick={() => setFilterType(null)}>
            <Wrap16 data-font="ibm">Свернуть</Wrap16>
          </CloseBtnCol>
        </LabelRow>
        <BlackRow>
          <AutoCompleteWrapper>
            <Form
              initialValues={initialValues}
              layout="horizontal"
              onFinish={handleFinish}
            >
              <Form.Item name="search">
                <AutoCompleteSearch
                  allowClear={true}
                  onClear={() => setSearch()}
                  options={
                    stateData
                      ? stateData.map((item = {}) => {
                          const { nameru } = item;

                          return { label: nameru, value: nameru };
                        })
                      : []
                  }
                  placeholder="Попробуйте ввести ключевое слово"
                  filterOption={(inputValue, option) =>
                    option.value
                      .toUpperCase()
                      .indexOf(inputValue.toUpperCase()) !== -1
                  }
                />
              </Form.Item>

              <Form.Item>
                <FormBtn type="primary" htmlType="submit">
                  Искать
                </FormBtn>
              </Form.Item>
            </Form>
          </AutoCompleteWrapper>
        </BlackRow>
      </Col>
    </BlackPanel>
  );
};

export { DirectionsFilter, YearsFilter, SearchFilter };
