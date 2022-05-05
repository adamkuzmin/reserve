import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useStore } from "../../Store/useStore";

import { Col, Space, Grid, Row } from "antd";
import {
  Gap,
  ContentFlex,
  LocalTitle,
  VertFlex,
  LeadQuote,
  ShowBtn,
  LeadDescription,
} from "./common/styles";

import { Content } from "../../Components/common/body";
import {
  Text60,
  Text48,
  Text36,
  Text30,
  Text24,
  Wrap16,
  Wrap24,
} from "../../Components/common/text";

import {
  leadIntro,
  secondaryIntro,
  plotkinProfile,
  whatwedo,
  directions,
} from "./about/data";

const { useBreakpoint } = Grid;

const PlotkinPhoto = styled.div`
  width: 47vw;
  padding-bottom: 110.6%;
  background-color: lightgrey;
  background: url("/about/p1.jpg");
  background-size: cover;
  margin-bottom: 24px;

  @media (max-width: 992px) {
    width: 100%;
  }
`;

const Direction = styled.div`
  display: flex;
  align-items: center;

  &&::before {
    content: "";
    min-width: 75px;
    height: 10px;
    background: url("/about/arrow.svg");
    background-size: cover;
    margin-right: 25px;
  }

  &:hover > span {
    opacity: 0.6;
  }
`;

const BackImage = styled.div`
  width: 100vw;
  height: 55.6vw;

  background: url("/about/office/1.jpg");
  background-size: cover;
`;

const Tip = styled.div`
  opacity: 0;

  &&[data-display="show"] {
    transition: all 1s fade-in;
    opacity: 1;
  }
  &&[data-display="hide"] {
    opacity: 0;
  }
`;

const About = () => {
  const screens = useBreakpoint();

  const [bioIsFull, SetBioIsFull] = useState(false);

  const lang = useStore((state) => state.lang);

  const setBlackLogo = useStore((state) => state.setBlackLogo);
  const blackLogo = useStore((state) => state.blackLogo);

  useEffect(() => {
    setBlackLogo(true);
  }, []);

  const contentRef = useRef();

  useEffect(() => {
    const onScroll = () => {
      if (contentRef && contentRef.current) {
        const maincontent = contentRef.current.getBoundingClientRect();

        if (maincontent.top <= 0 && maincontent.bottom >= 0 && !blackLogo) {
          setBlackLogo(true);
        }
      }
    };
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  });

  const [tooltip, setTooltip] = useState(false);

  return (
    <>
      <Content ref={contentRef}>
        <Gap sheight={`120px`} />
        <ContentFlex>
          <Gap swidth={`12.1vw`} />
          <LeadQuote>
            <Text60 data-font="wremena">{leadIntro[lang]}</Text60>
          </LeadQuote>
        </ContentFlex>

        <LeadDescription>
          <Text36 data-font="ibm">{secondaryIntro[lang]}</Text36>
        </LeadDescription>

        <Gap sheight={`120px`} />

        <ContentFlex direction={screens.lg ? "horizontal" : "vertical"}>
          {!screens.lg && (
            <Col>
              <PlotkinPhoto />
            </Col>
          )}

          <Col>
            <LocalTitle size={48}>{plotkinProfile.name[lang]}</LocalTitle>
            <Text30>{plotkinProfile.whois[lang]}</Text30>
            <Gap sheight={`64px`} />
            <ContentFlex style={screens.sm ? { paddingRight: "80px" } : {}}>
              <Gap swidth={`12.1vw`} />
              <VertFlex size={"20px"}>
                <Text24>
                  {!bioIsFull
                    ? plotkinProfile.shortbio[lang]
                    : plotkinProfile.fullbio[lang]}
                </Text24>
                <ShowBtn onClick={() => SetBioIsFull(!bioIsFull)}>
                  <Text24 data-font="wremena">
                    {bioIsFull ? "Скрыть биографию" : "Раскрыть биографию"}
                  </Text24>
                </ShowBtn>
              </VertFlex>
            </ContentFlex>
          </Col>
          {screens.lg && (
            <Col>
              <PlotkinPhoto />
            </Col>
          )}
        </ContentFlex>

        <Gap sheight={`120px`} />

        <LeadDescription>
          <LocalTitle size={48}>{whatwedo.title[lang]}</LocalTitle>
          <Gap sheight={`24px`} />
          <Text36 data-font="ibm">{whatwedo.descr[lang]}</Text36>
        </LeadDescription>

        <Gap sheight={`120px`} />

        <Row gutter={[24, 24]} style={{ width: "100%" }}>
          <Col span={12}>
            <Space direction="vertical" size={18}>
              {directions.map((direction, i) => {
                return (
                  <Direction
                    key={`dir:${i}`}
                    onMouseEnter={() => setTooltip(true)}
                    onMouseLeave={() => setTooltip(false)}
                  >
                    <Text30 text-font="ibm">{direction[lang]}</Text30>
                  </Direction>
                );
              })}
            </Space>
          </Col>

          {
            <Col span={7}>
              {
                <Tip data-display={tooltip ? "show" : "hide"}>
                  <Text24 style={{ opacity: 0.7 }}>
                    В 1987 году основано «Творческое производственное
                    объединение “РЕЗЕРВ”». С момента создания компания не
                    прекращала работу. Каждый день в течение более чем тридцати
                    лет мы создаем и строим архитектуру.
                  </Text24>
                </Tip>
              }
            </Col>
          }
        </Row>

        <Gap sheight={`120px`} />
      </Content>
      <BackImage />
    </>
  );
};

export default About;
