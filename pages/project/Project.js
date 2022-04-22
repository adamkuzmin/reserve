import { useEffect, useRef, useState } from "react";
import { useStore } from "../../Store/useStore";

import styled from "styled-components";

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
import Slider from "../../Components/Slider/Slider";

const PlansSlider = styled.div`
  width: 100vw;
  height: 100vh;
`;

const Project = () => {
  const blackLogo = useStore((state) => state.blackLogo);
  const setBlackLogo = useStore((state) => state.setBlackLogo);

  useEffect(() => {
    setBlackLogo(false);
  }, []);

  const contentRef = useRef();
  const contentRef1 = useRef();

  const goToDescription = (e) => {
    e.preventDefault();

    e.preventDefault();
    contentRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  useEffect(() => {
    const onScroll = () => {
      if (contentRef && contentRef.current) {
        const maincontent = contentRef.current.getBoundingClientRect();

        if (maincontent.top <= 0 && maincontent.bottom >= 0 && !blackLogo) {
          setBlackLogo(true);
        }
      }

      if (contentRef1 && contentRef1.current) {
        const maincontent1 = contentRef1.current.getBoundingClientRect();

        if (maincontent1.top <= 0 && maincontent1.bottom >= 0 && !blackLogo) {
          setBlackLogo(true);
        }
      }
    };
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  });

  return (
    <div>
      <NavRight />
      <Navigation />

      <ProjectCover scrolling={goToDescription} />
      <Content ref={contentRef}>
        <ProjectHeader />
        <ProjectContent />
      </Content>

      <PlansSlider>
        <Slider projectType scrolling={goToDescription} />
      </PlansSlider>

      <Content ref={contentRef1}>
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
