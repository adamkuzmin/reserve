import { useEffect, useRef, useState } from "react";

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
  const [MiniNavIsOpened, setMiniNavIsOpened] = useState(false);
  const [BlackBlockIsScrolling, setBlackBlockIsScrolling] = useState(false);

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

      <ProjectCover />
      <Content>
        <ProjectHeader />
        <ProjectContent />
      </Content>
      <ProjectPlan />
      <Content><OtherRenders/><ProjectBottom/></Content>

      <Content background={"black"}>
        <Footer {...{ BlackBlockIsScrolling, setBlackBlockIsScrolling }} />
      </Content>
    </div>
  );
};

export default Project;
