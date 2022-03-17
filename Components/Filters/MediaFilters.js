import { useRouter } from "next/router";
import { useStore } from "../../Store/useStore";

import { Text24 } from "../common/text";
import { FilterWrapper, Filters, FLink } from "./styles";

/* * Компонент "Плавающие фильтры" */
const MediaFilters = ({ setLayoutType, layoutType }) => {
  const setBarIsVisible = useStore((state) => state.setBarIsVisible);

  const lang = useStore((state) => state.lang);

  const toPageTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <FilterWrapper style={{ minWidth: "max-content" }}>
      <Filters size={0}>
        <FLink
          data-type={layoutType === "all" && "link"}
          onClick={() => {
            setLayoutType("all");
            toPageTop();
            setBarIsVisible(Math.random());
          }}
        >
          <Text24>{lang === "ru" ? "Все" : "All"}</Text24>
        </FLink>
        <FLink
          data-type={layoutType === "news" && "link"}
          onClick={() => {
            setLayoutType("news");
            toPageTop();
            setBarIsVisible(Math.random());
          }}
        >
          <Text24>{lang === "ru" ? "Новости" : "News"}</Text24>
        </FLink>
        <FLink
          data-type={layoutType === "publications" && "link"}
          onClick={() => {
            setLayoutType("publications");
            toPageTop();
            setBarIsVisible(Math.random());
          }}
        >
          <Text24>{lang === "ru" ? "Публикации" : "Publications"}</Text24>
        </FLink>
        <FLink
          data-type={layoutType === "interviews" && "link"}
          onClick={() => {
            setLayoutType("interviews");
            toPageTop();
            setBarIsVisible(Math.random());
          }}
        >
          <Text24>{lang === "ru" ? "Интервью" : "Interview"}</Text24>
        </FLink>
        <FLink
          data-type={layoutType === "exhibitions" && "link"}
          onClick={() => {
            setLayoutType("exhibitions");
            toPageTop();
            setBarIsVisible(Math.random());
          }}
        >
          <Text24>{lang === "ru" ? "Выставки" : "Exhibitions"}</Text24>
        </FLink>
      </Filters>
    </FilterWrapper>
  );
};

export default MediaFilters;
