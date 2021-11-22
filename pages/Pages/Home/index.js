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

const { Paragraph } = Typography;

const Cover = styled.div`
  width: 100vw;
  height: 100vh;
`;

const StyledTitle = styled.h2`
  font-weight: 600;
  color: black;
  margin-bottom: 30px
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
        <PreludeWithKPI />
        <GeneralLead />
        <InteractiveDescription />
      </Content>
      <Content ref={LastProjectsRef} justifyContent={"flex-end"}>
        <Col>
          <StyledTitle>
            <Text60>Актуальные проекты</Text60>
          </StyledTitle>
          <LeadText>
            <Text36>
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
