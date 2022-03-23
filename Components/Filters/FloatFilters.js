import React, { useState, useEffect } from "react";
import { useStore } from "../../Store/useStore";
import styled from "styled-components";

import { Text24 } from "../common/text";
import { FilterWrapper, Filters, FLink } from "./styles";
import { DirectionsFilter, YearsFilter, SearchFilter } from "./ProjectsFilter";

import { projectData } from "../ProjectsLayout/data/data";

const MobileFilterWrapper = styled.div`
  width: 100vw;
  height: 0px;
  position: fixed;
  top: auto;
  bottom: 0;

  pointer-events: none;
`;

import { Badge, Grid } from "antd";
const { useBreakpoint } = Grid;

const filterData = {
  gallery: {
    ru: <>Галерея</>,
    en: <>Gallery</>,
  },
  list: {
    ru: <>Список</>,
    en: <>List</>,
  },
  map: {
    ru: <>Карта</>,
    en: <>Map</>,
  },
  direction: {
    ru: <>Направления</>,
    en: <>Directions</>,
  },
  year: {
    ru: <>Год</>,
    en: <>Year</>,
  },
  search: {
    ru: <>Поиск</>,
    en: <>Search</>,
  },
};

const IfDesktop = ({ visible = true, children }) => {
  if (visible) {
    return children;
  }

  return null;
};

const IfMobile = ({ visible = true, children }) => {
  if (visible) {
    return children;
  }

  return null;
};

/* * Компонент "Плавающие фильтры" */
const FloatFilters = ({
  setLayoutType,
  LayoutType,
  FilterType,
  setFilterType,
  toPageTop,
  stateData,
  setStateData,
}) => {
  const screens = useBreakpoint();

  const setAnimatedGallery = useStore((state) => state.setAnimatedGallery);
  const animatedGallery = useStore((state) => state.animatedGallery);

  const setBarIsVisible = useStore((state) => state.setBarIsVisible);

  const [DirItems, selDirItems] = useState([0]);
  const [YearItems, selYearItems] = useState([0]);

  /* фильтрация по параметрам */
  useEffect(() => {
    setStateData((state) =>
      projectData
        .filter(
          ({
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
          }) => {
            let condition = false;
            if (DirItems.includes(1) && residential) condition = true;
            if (DirItems.includes(2) && office) condition = true;
            if (DirItems.includes(3) && trading) condition = true;
            if (DirItems.includes(4) && culture) condition = true;
            if (DirItems.includes(5) && transport) condition = true;
            if (DirItems.includes(6) && mixed) condition = true;
            if (DirItems.includes(7) && urban) condition = true;
            if (DirItems.includes(8) && current) condition = true;
            if (DirItems.includes(9) && competition) condition = true;
            if (DirItems.includes(10) && art) condition = true;

            if (DirItems.includes(0)) condition = true;

            return condition;
          }
        )
        .filter(({ finished }) => {
          let condition = false;

          if (YearItems.includes(finished)) condition = true;
          if (YearItems.includes(0)) condition = true;

          return condition;
        })
    );
  }, [DirItems, YearItems, projectData]);

  const lang = useStore((state) => state.lang);

  return (
    <>
      <IfMobile visible={!screens.sm}>
        <MobileFilterWrapper>
          {
            /**
             * Фильтр "Направления"
             */
            FilterType === 1 && (
              <DirectionsFilter
                {...{
                  setFilterType,
                  stateData,
                  setStateData,
                  DirItems,
                  selDirItems,
                  toPageTop,
                }}
              />
            )
          }
          {
            /**
             * Фильтр "Года"
             */
            FilterType === 2 && (
              <YearsFilter
                {...{
                  setFilterType,
                  stateData,
                  setStateData,
                  YearItems,
                  selYearItems,
                  toPageTop,
                }}
              />
            )
          }
          {
            /**
             * Фильтр "Года"
             */
            FilterType === 3 && (
              <SearchFilter
                {...{
                  setFilterType,
                  stateData,
                  setStateData,
                  toPageTop,
                }}
              />
            )
          }
        </MobileFilterWrapper>
      </IfMobile>

      <FilterWrapper
        data-animation={animatedGallery ? "true" : "false"}
        size={0}
      >
        <IfDesktop visible={screens.sm}>
          {
            /**
             * Фильтр "Направления"
             */
            FilterType === 1 && (
              <DirectionsFilter
                {...{
                  setFilterType,
                  stateData,
                  setStateData,
                  DirItems,
                  selDirItems,
                  toPageTop,
                }}
              />
            )
          }
          {
            /**
             * Фильтр "Года"
             */
            FilterType === 2 && (
              <YearsFilter
                {...{
                  setFilterType,
                  stateData,
                  setStateData,
                  YearItems,
                  selYearItems,
                  toPageTop,
                }}
              />
            )
          }
          {
            /**
             * Фильтр "Года"
             */
            FilterType === 3 && (
              <SearchFilter
                {...{
                  setFilterType,
                  stateData,
                  setStateData,
                  toPageTop,
                }}
              />
            )
          }
        </IfDesktop>

        <Filters size={0}>
          <FLink
            data-type={LayoutType === 1 && "link"}
            onClick={() => {
              setAnimatedGallery(false);
              setLayoutType(1);
              toPageTop();
              setBarIsVisible(Math.random());
            }}
          >
            <Text24>{filterData.gallery[lang]}</Text24>
          </FLink>
          <FLink
            data-type={LayoutType === 0 && "link"}
            onClick={() => {
              setAnimatedGallery(false);
              setLayoutType(0);
              toPageTop();
              setBarIsVisible(Math.random());
            }}
          >
            <Text24>{filterData.list[lang]}</Text24>
          </FLink>
          <FLink
            data-type={LayoutType === 2 && "link"}
            onClick={() => {
              setAnimatedGallery(false);
              setLayoutType(2);
              toPageTop();
              setBarIsVisible(Math.random());
            }}
          >
            <Text24>{filterData.map[lang]}</Text24>
          </FLink>
        </Filters>

        <IfDesktop visible={screens.sm}>
          <Filters
            size={0}
            data-block="filter"
            data-theme={FilterType !== null && "black"}
          >
            <Badge
              count={DirItems.includes(0) ? 0 : DirItems.length}
              offset={[-15, 0]}
            >
              <FLink
                data-type={
                  FilterType !== null && FilterType !== 1 && "notfilter"
                }
                onClick={() => setFilterType(1)}
              >
                <Text24>{filterData.direction[lang]}</Text24>
              </FLink>
            </Badge>
            <Badge
              count={YearItems.includes(0) ? 0 : YearItems.length}
              offset={[-15, 0]}
            >
              <FLink
                data-type={
                  FilterType !== null && FilterType !== 2 && "notfilter"
                }
                onClick={() => setFilterType(2)}
              >
                <Text24>{filterData.year[lang]}</Text24>
              </FLink>
            </Badge>
            <Badge count={0} offset={[-15, 0]}>
              <FLink
                data-type={
                  FilterType !== null && FilterType !== 3 && "notfilter"
                }
                onClick={() => setFilterType(3)}
              >
                <Text24>{filterData.search[lang]}</Text24>
              </FLink>
            </Badge>
          </Filters>
        </IfDesktop>

        <IfMobile visible={!screens.sm}>
          <Filters
            size={0}
            data-block="filter"
            data-theme={FilterType !== null && "black"}
          >
            <FLink onClick={() => setFilterType(1)}>
              <div style={{ transform: "scale(0.85) translateY(3px)" }}>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M10.2782 3.5087C10.2782 2.56501 11.0432 1.8 11.9869 1.8C12.9306 1.8 13.6956 2.56501 13.6956 3.5087C13.6956 4.45238 12.9306 5.21739 11.9869 5.21739C11.0432 5.21739 10.2782 4.45238 10.2782 3.5087ZM8.59474 4.4087H0.247803V2.6087H8.59474C8.99212 1.10697 10.3603 0 11.9869 0C13.9247 0 15.4956 1.5709 15.4956 3.5087C15.4956 5.4465 13.9247 7.01739 11.9869 7.01739C10.3603 7.01739 8.99212 5.91042 8.59474 4.4087Z"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M5.21737 11.987C5.21737 11.0433 4.45236 10.2783 3.50867 10.2783C2.56499 10.2783 1.79998 11.0433 1.79998 11.987C1.79998 12.9307 2.56499 13.6957 3.50867 13.6957C4.45236 13.6957 5.21737 12.9307 5.21737 11.987ZM6.90087 12.887H15.2478V11.087H6.90087C6.50349 9.58524 5.13535 8.47827 3.50867 8.47827C1.57087 8.47827 -2.38419e-05 10.0492 -2.38419e-05 11.987C-2.38419e-05 13.9248 1.57087 15.4957 3.50867 15.4957C5.13535 15.4957 6.50349 14.3887 6.90087 12.887Z"
                  />
                </svg>
              </div>
            </FLink>
          </Filters>
        </IfMobile>
      </FilterWrapper>
    </>
  );
};

export default FloatFilters;

/* data-theme={FilterType !== null && "black"} */
