import { useEffect, useRef, useState } from "react";

import Navigation from "../../Components/Navigation/Navigation";
import NavRight from "../../Components/NavRight/NavRight";

import Footer from "../../Components/Footer/Footer";
import { Content } from "../../Components/common/body";

import { ScreenLead } from "../../Components/common/body";
import StaticFilters from "../../Components/StaticFilters/StaticFilters";

import ProjectsGallery from "../../Components/ProjectsLayout/ProjectsGallery";
import ProjectsTable from "../../Components/ProjectsLayout/ProjectsTable";
import ProjectsMap from "../../Components/ProjectsLayout/ProjectsMap";

const Projects = () => {
  const [MiniNavIsOpened, setMiniNavIsOpened] = useState(false);
  const [BlackBlockIsScrolling, setBlackBlockIsScrolling] = useState(false);

  const [LayoutType, setLayoutType] = useState(1);

  let LayoutBlock;
  if (LayoutType === 0) {
    LayoutBlock = <ProjectsTable />;
  } else if (LayoutType === 1) {
    LayoutBlock = <ProjectsGallery />;
  } else if (LayoutType === 2) {
    LayoutBlock = <ProjectsMap />;
  }

  return (
    <div>
      <NavRight {...{ MiniNavIsOpened }} />
      <Navigation
        {...{
          MiniNavIsOpened,
          setMiniNavIsOpened,
          BlackBlockIsScrolling,
          setBlackBlockIsScrolling,
        }}
      />

      <Content>
        <ScreenLead margintop={"12.5vw"} marginbottom={"6.9vw"}>
          Резерв&nbsp;&mdash; это бюро, которое создает решения, определяющие
          и&nbsp;меняющие мировую моду в&nbsp;архитектуре и&nbsp;способные
          создавать эмоции в&nbsp;душах даже самых черствых людей.
        </ScreenLead>
        <StaticFilters {...{ LayoutType, setLayoutType }} />
      </Content>
      <Content>{LayoutBlock}</Content>

      <Content background={"black"}>
        <Footer {...{ BlackBlockIsScrolling, setBlackBlockIsScrolling }} />
      </Content>
    </div>
  );
};

export default Projects;
