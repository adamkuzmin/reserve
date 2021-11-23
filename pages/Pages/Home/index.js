import styled from "styled-components";
import { Typography } from "antd";

import Navigation from "../../../Components/Navigation/Navigation";
import NavRight from "../../../Components/NavRight/NavRight";

import Slider from "../../../Components/Slider/Slider";
import LastProjects from "../../../Components/LastProjects/LastProjects";
import LastMedia from "../../../Components/LastMedia/LastMedia";
import Footer from "../../../Components/Footer/Footer";
import { Content, Col, LeadText } from "../../../Components/common/body";
import { useEffect, useRef, useState } from "react";

import ThreeCanvas from '../../../Models/construcetor'

import {
  Text254,
  Text96,
  Text60,
  Text48,
  Text40,
  Text36,
  Text30,
  Text24,
} from "../../../Components/common/text";
import PreludeWithKPI from "../../../Components/MainDescription/PreludeWithKPI";
import GeneralLead from "../../../Components/MainDescription/GeneralLead";
import InteractiveDescription from "../../../Components/MainDescription/InteractiveDescription";
import FloatedBack from "../../../Components/MainDescription/FloatedBack";

const { Paragraph } = Typography;

const Cover = styled.div`
  width: 100vw;
  height: 100vh;
`;

const StyledTitle = styled.h2`
  font-weight: 600;
  color: black;
  margin-top: 6vw;
  margin-bottom: 1.5vw;
`;

const CanvasGeometry = styled.div`
  position: absolute;
  top: 80px;
  left: 0;
  width: 35vw;
  height: 40.5vw;
  //background-image: url("/renders/16.svg");
  //background-size: cover;
`;

const Home = () => {
  const [MiniNavIsOpened, setMiniNavIsOpened] = useState(false);
  const [BlackBlockIsScrolling, setBlackBlockIsScrolling] = useState(true);

  const BodyRef = useRef();
  const DescriptionRef = useRef();
  const LastProjectsRef = useRef();

  useEffect(() => {
    const onScroll = (e) => {
      const BoundingRect = DescriptionRef.current.getBoundingClientRect();

      if (
        BoundingRect.top <= 0 &&
        BoundingRect.bottom >= 0 &&
        BlackBlockIsScrolling
      ) {
        setBlackBlockIsScrolling(false);
      }

      const BoundingRect1 = LastProjectsRef.current.getBoundingClientRect();

      if (
        BoundingRect1.top <= 0 &&
        BoundingRect1.bottom >= 0 &&
        BlackBlockIsScrolling
      ) {
        setBlackBlockIsScrolling(false);
      }
    };
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  });

  return (
    <div ref={BodyRef}>
      <NavRight {...{ MiniNavIsOpened }} />
      <Navigation
        {...{
          MiniNavIsOpened,
          setMiniNavIsOpened,
          BlackBlockIsScrolling,
          setBlackBlockIsScrolling,
        }}
      />
      <Cover>
        <Slider {...{ BlackBlockIsScrolling, setBlackBlockIsScrolling }} />
      </Cover>
      <Content justifyContent={"flex-end"} ref={DescriptionRef}>
        <CanvasGeometry>
          <ThreeCanvas/>
          </CanvasGeometry>
        <PreludeWithKPI />
        <GeneralLead />
      </Content>

      <FloatedBack />

      <Content ref={LastProjectsRef} justifyContent={"flex-end"}>
        <Col>
          <StyledTitle>
            <Text60 data-font="ibm">Актуальные проекты</Text60>
          </StyledTitle>
          <LeadText>
            <Text36 data-font="ibm">
              Мы спроектировали колоссальное количество общественных
              пространств, что прям душа не может нарадоваться. А визуалки
              просто блеск!
            </Text36>
          </LeadText>
        </Col>
      </Content>
      <Content>
        <LastProjects
          {...{ BlackBlockIsScrolling, setBlackBlockIsScrolling }}
        />
      </Content>
      <Content background={"black"}>
        <LastMedia {...{ BlackBlockIsScrolling, setBlackBlockIsScrolling }} />
      </Content>
      <Content background={"black"}>
        <Footer {...{ BlackBlockIsScrolling, setBlackBlockIsScrolling }} />
      </Content>
    </div>
  );
};

export default Home;
