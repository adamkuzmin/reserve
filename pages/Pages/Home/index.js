import { useEffect, useRef, useState } from "react";
import { useStore } from "../../../Store/useStore";

import styled from "styled-components";
import { Typography } from "antd";

import Navigation from "../../../Components/Navigation/Navigation";
import NavRight from "../../../Components/NavRight/NavRight";

import Slider from "../../../Components/Slider/Slider";
import LastProjects from "../../../Components/LastProjects/LastProjects";
import LastMedia from "../../../Components/LastMedia/LastMedia";
import Footer from "../../../Components/Footer/Footer";
import { Content } from "../../../Components/common/body";

import ThreeCanvas from "../../../Models/construcetor";

import PreludeWithKPI from "../../../Components/MainDescription/PreludeWithKPI";
import GeneralLead from "../../../Components/MainDescription/GeneralLead";
import FloatedBack from "../../../Components/MainDescription/FloatedBack";
import SectionLead from "../../../Components/MainDescription/SectionLead";

const { Paragraph } = Typography;

const Cover = styled.div`
  width: 100vw;
  height: 100vh;
`;

const CanvasGeometry = styled.div`
  position: absolute;
  opacity: 0.7;
  top: 80px;
  left: 0;
  width: 35vw;
  height: 40.5vw;

  @media (max-width: 480px) {
    top: 260px;
    left: 0;
    width: 100vw;
    height: 99vw;

    display: none;
  }

  //background-image: url("/renders/16.svg");
  //background-size: cover;
`;

const Home = () => {
  const blackLogo = useStore((state) => state.blackLogo);
  const setBlackLogo = useStore((state) => state.setBlackLogo);

  const BodyRef = useRef();
  const DescriptionRef = useRef();
  const LastProjectsRef = useRef();

  useEffect(() => {
    const onScroll = (e) => {
      if (DescriptionRef && DescriptionRef.current) {
        const BoundingRect = DescriptionRef.current.getBoundingClientRect();

        if (BoundingRect.top <= 0 && BoundingRect.bottom >= 0 && !blackLogo) {
          setBlackLogo(true);
        }

        const BoundingRect1 = LastProjectsRef.current.getBoundingClientRect();

        if (BoundingRect1.top <= 0 && BoundingRect1.bottom >= 0 && !blackLogo) {
          setBlackLogo(true);
        }
      }
    };
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  });

  return (
    <div ref={BodyRef}>
      <NavRight />
      <Navigation />
      <Cover>
        <Slider />
      </Cover>
      <Content justifyContent={"flex-end"} ref={DescriptionRef}>
        <CanvasGeometry>
          <ThreeCanvas />
        </CanvasGeometry>
        <PreludeWithKPI />
        <GeneralLead />
      </Content>

      <FloatedBack />

      <Content ref={LastProjectsRef} justifyContent={"flex-end"}>
        <SectionLead />
      </Content>
      <Content>
        <LastProjects />
      </Content>
      <Content background={"black"}>
        <LastMedia />
      </Content>
      <Content background={"black"}>
        <Footer />
      </Content>
    </div>
  );
};

export default Home;
