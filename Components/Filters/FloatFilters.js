import { useStore } from "../../Store/useStore";

import { Text24 } from "../common/text";
import { FilterWrapper, Filters, FLink } from "./styles";
import { DirectionsFilter, YearsFilter, SearchFilter } from "./ProjectsFilter";

/* * Компонент "Плавающие фильтры" */
const FloatFilters = ({
  setLayoutType,
  LayoutType,
  setGalleryAnimation,
  FilterType,
  setFilterType,
  toPageTop,
}) => {
  const setBarIsVisible = useStore((state) => state.setBarIsVisible);

  return (
    <FilterWrapper data-animation="true">
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
            toPageTop();
            setBarIsVisible(Math.random());
          }}
        >
          <Text24>Галерея</Text24>
        </FLink>
        <FLink
          data-type={LayoutType === 0 && "link"}
          onClick={() => {
            setGalleryAnimation(false);
            setLayoutType(0);
            toPageTop();
            setBarIsVisible(Math.random());
          }}
        >
          <Text24>Список</Text24>
        </FLink>
        <FLink
          data-type={LayoutType === 2 && "link"}
          onClick={() => {
            setGalleryAnimation(false);
            setLayoutType(2);
            toPageTop();
            setBarIsVisible(Math.random());
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
