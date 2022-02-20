import { useEffect, useRef, useState } from "react";
import { useStore } from "../../Store/useStore";
import styled from "styled-components";

import Navigation from "../../Components/Navigation/Navigation";
import NavRight from "../../Components/NavRight/NavRight";

import Footer from "../../Components/Footer/Footer";
import { Content } from "../../Components/common/body";

import ProjectsGallery from "../../Components/ProjectsLayout/ProjectsGallery";
import ProjectsTable from "../../Components/ProjectsLayout/ProjectsTable";
import ProjectsMap from "../../Components/ProjectsLayout/ProjectsMap";

import FloatFilters from "../../Components/Filters/FloatFilters";

const MainContent = styled(Content)`
  &&& {
    padding-left: 40px;
    padding-right: 40px;
    padding-top: 100px;
    overflow-x: hidden;

    &&[data-type="filter-mode"] {
      filter: blur(2px);
      opacity: 0.6;
    }
  }
`;

const Projects = () => {
  /**
   * States для анимации галереи
   */
  const [IsGalleryAnimation, setGalleryAnimation] = useState(true);

  const blackLogo = useStore((state) => state.blackLogo);
  const setBlackLogo = useStore((state) => state.setBlackLogo);

  const [LayoutType, setLayoutType] = useState(1);
  const [FilterType, setFilterType] = useState(null);

  const toPageTop = () => {
    window.scrollTo(0, 0);
  };

  /**
   * Скролл
   */
  const maincontentRef = useRef();

  useEffect(() => {
    const onScroll = () => {
      const maincontent = maincontentRef.current.getBoundingClientRect();

      if (maincontent.top <= 0 && maincontent.bottom >= 0 && !blackLogo) {
        setBlackLogo(true);
      }
    };
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  });

  useEffect(() => {
    setBlackLogo(true);
  }, []);

  /**
   * Разделы
   */

  let LayoutBlock;
  if (LayoutType === 0) {
    LayoutBlock = <ProjectsTable />;
  } else if (LayoutType === 1) {
    LayoutBlock = <ProjectsGallery {...{ IsGalleryAnimation }} />;
  } else if (LayoutType === 2) {
    LayoutBlock = <ProjectsMap />;
  }

  return (
    <div>
      <NavRight />
      <Navigation />
      <FloatFilters
        {...{
          //разделы
          setLayoutType,
          LayoutType,
          //Фильтры
          FilterType,
          setFilterType,
          //Дополнительное
          toPageTop,
          setGalleryAnimation,
        }}
      />
      <MainContent
        ref={maincontentRef}
        data-type={FilterType !== null && "filter-mode"}
      >
        {LayoutBlock}
      </MainContent>

      <Content background={"black"}>
        <Footer />
      </Content>
    </div>
  );
};

export default Projects;
