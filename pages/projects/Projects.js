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

import { projectData } from "../../Components/ProjectsLayout/data/data";

const MainContent = styled(Content)`
  &&& {
    padding-left: 40px;
    padding-right: 40px;
    padding-top: 100px;
    overflow-x: hidden;

    min-height: 100vh;

    & {
      transition: all 1s ease-in-out;
    }
  }
`;

const FilterBackdrop = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 9000;
`;

const Projects = () => {
  /* записи */
  const [stateData, setStateData] = useState(projectData);

  /**
   * States для анимации галереи
   */

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
      if (maincontentRef && maincontentRef.current) {
        const maincontent = maincontentRef.current.getBoundingClientRect();

        if (maincontent.top <= 0 && maincontent.bottom >= 0 && !blackLogo) {
          setBlackLogo(true);
        }
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

  switch (LayoutType) {
    case 0:
      LayoutBlock = <ProjectsTable {...{ stateData }} />;
      break;
    case 1:
      LayoutBlock = <ProjectsGallery {...{ stateData }} />;
      break;
    case 2:
      LayoutBlock = <ProjectsMap {...{ stateData }} />;
      break;
  }

  return (
    <div>
      <NavRight />
      <Navigation />

      {FilterType && <FilterBackdrop onClick={() => setFilterType(null)} />}

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
          //работа с записями
          stateData,
          setStateData,
        }}
      />
      <MainContent ref={maincontentRef}>{LayoutBlock}</MainContent>

      <Content background={"black"}>
        <Footer />
      </Content>
    </div>
  );
};

export default Projects;
