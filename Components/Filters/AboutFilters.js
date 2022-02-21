import { useStore } from "../../Store/useStore";

import { Text24 } from "../common/text";
import { FilterWrapper, Filters, FLink } from "./styles";
import { DirectionsFilter, YearsFilter, SearchFilter } from "./ProjectsFilter";
import { useState } from "react";

/* * Компонент "Плавающие фильтры" */
const AboutFilters = ({ setLayoutType, layoutType }) => {
  const setBarIsVisible = useStore((state) => state.setBarIsVisible);

  const lang = useStore((state) => state.lang);

  const toPageTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <FilterWrapper style={{ minWidth: "max-content" }}>
      <Filters size={0}>
        <FLink
          data-type={layoutType === 1 && "link"}
          onClick={() => {
            setLayoutType(1);
            toPageTop();
            setBarIsVisible(Math.random());
          }}
        >
          <Text24>{lang === "ru" ? "О бюро" : "About"}</Text24>
        </FLink>
        <FLink
          data-type={layoutType === 2 && "link"}
          onClick={() => {
            setLayoutType(2);
            toPageTop();
            setBarIsVisible(Math.random());
          }}
        >
          <Text24>{lang === "ru" ? "Команда" : "Team"}</Text24>
        </FLink>
        <FLink
          data-type={layoutType === 3 && "link"}
          onClick={() => {
            setLayoutType(3);
            toPageTop();
            setBarIsVisible(Math.random());
          }}
        >
          <Text24>{lang === "ru" ? "Вакансии" : "Jobs"}</Text24>
        </FLink>
        <FLink
          data-type={layoutType === 4 && "link"}
          onClick={() => {
            setLayoutType(4);
            toPageTop();
            setBarIsVisible(Math.random());
          }}
        >
          <Text24>
            {lang === "ru" ? "Заказчики и партнеры" : "Customers and partners"}
          </Text24>
        </FLink>
        <FLink
          data-type={layoutType === 5 && "link"}
          onClick={() => {
            setLayoutType(5);
            toPageTop();
            setBarIsVisible(Math.random());
          }}
        >
          <Text24>{lang === "ru" ? "Награды" : "Awards"}</Text24>
        </FLink>
      </Filters>
    </FilterWrapper>
  );
};

export default AboutFilters;
