import { useEffect, useRef, useState } from "react";
import { useStore } from "../../Store/useStore";
import styled from "styled-components";

import dynamic from "next/dynamic";

import Navigation from "../../Components/Navigation/Navigation";
import NavRight from "../../Components/NavRight/NavRight";

import Footer from "../../Components/Footer/Footer";
import { Content } from "../../Components/common/body";

/*import ProjectsGallery from "../../Components/ProjectsLayout/ProjectsGallery";
import ProjectsTable from "../../Components/ProjectsLayout/ProjectsTable";
import ProjectsMap from "../../Components/ProjectsLayout/ProjectsMap";*/

import FloatFilters from "../../Components/Filters/FloatFilters";

import { projectData } from "../../Components/ProjectsLayout/data/data";

const ProjectsGallery = dynamic(() =>
  import("../../Components/ProjectsLayout/ProjectsGallery")
);
const ProjectsTable = dynamic(() =>
  import("../../Components/ProjectsLayout/ProjectsTable")
);
const ProjectsMap = dynamic(() =>
  import("../../Components/ProjectsLayout/ProjectsMap")
);

const MainContent = styled(Content)`
  &&& {
    padding-left: 40px;
    padding-right: 40px;
    padding-top: 100px;
    overflow-x: hidden;

    @media (max-width: 576px) {
      & {
        padding-top: 70px;
      }
    }

    min-height: 100vh;

    & {
      transition: all 1s ease-in-out;
    }

    transform: translateY(20px);
    opacity: 0;

    animation: SectionAppear 0.4s cubic-bezier(0.19, 1, 0.22, 1) 0.5s;
    @keyframes SectionAppear {
      0% {
        opacity: 0;
        transform: translateY(20px);
      }

      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }

    animation-fill-mode: forwards;
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
      <MainContent key={`contentType:${LayoutType}`} ref={maincontentRef}>
        {LayoutBlock}
      </MainContent>

      <Content background={"black"}>
        <Footer />
      </Content>
    </div>
  );
};

export default Projects;
