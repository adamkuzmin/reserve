import { useEffect, useRef, useState } from "react";
import { useStore } from "../../Store/useStore";

import Navigation from "../../Components/Navigation/Navigation";
import NavRight from "../../Components/NavRight/NavRight";

import Footer from "../../Components/Footer/Footer";
import { Content } from "../../Components/common/body";

import { ScreenLead } from "../../Components/common/body";
import ProjectCover from "../../Components/ProjectInfo/ProjectCover";
import ProjectPlan from "../../Components/ProjectInfo/ProjectPlan";
import ProjectHeader from "../../Components/ProjectInfo/ProjectHeader";
import ProjectContent from "../../Components/ProjectInfo/ProjectContent";
import OtherRenders from "../../Components/ProjectInfo/OtherRenders";
import ProjectBottom from "../../Components/ProjectInfo/ProjectBottom";

const Project = () => {
  const blackLogo = useStore((state) => state.blackLogo);
  const setBlackLogo = useStore((state) => state.setBlackLogo);

  useEffect(() => {
    setBlackLogo(true);
  }, []);

  return (
    <div>
      <NavRight />
      <Navigation />

      <ProjectCover />
      <Content>
        <ProjectHeader />
        <ProjectContent />
      </Content>
      <ProjectPlan />
      <Content>
        <OtherRenders />
        <ProjectBottom />
      </Content>

      <Content background={"black"}>
        <Footer />
      </Content>
    </div>
  );
};

export default Project;
