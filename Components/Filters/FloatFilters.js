import React, { useState, useEffect } from "react";
import { useStore } from "../../Store/useStore";
import styled from "styled-components";

import { Text24 } from "../common/text";
import { FilterWrapper, Filters, FLink } from "./styles";
import { DirectionsFilter, YearsFilter, SearchFilter } from "./ProjectsFilter";

import { projectData } from "../ProjectsLayout/data/data";

import { Badge } from "antd";

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
    <FilterWrapper data-animation={animatedGallery ? "true" : "false"} size={0}>
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
            data-type={FilterType !== null && FilterType !== 1 && "notfilter"}
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
            data-type={FilterType !== null && FilterType !== 2 && "notfilter"}
            onClick={() => setFilterType(2)}
          >
            <Text24>{filterData.year[lang]}</Text24>
          </FLink>
        </Badge>
        <Badge count={0} offset={[-15, 0]}>
          <FLink
            data-type={FilterType !== null && FilterType !== 3 && "notfilter"}
            onClick={() => setFilterType(3)}
          >
            <Text24>{filterData.search[lang]}</Text24>
          </FLink>
        </Badge>
      </Filters>
    </FilterWrapper>
  );
};

export default FloatFilters;
