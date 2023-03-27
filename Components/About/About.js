import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import styled from "styled-components";
import { useStore } from "../../Store/useStore";

import { Col, Space, Grid, Row } from "antd";
import {
  Gap,
  ContentFlex,
  LocalTitle,
  VertFlex,
  LeadQuote,
  LeadDescription,
} from "./common/styles";

import { Content } from "../../Components/common/body";
import { Text60, Text36, Text30, Text24 } from "../../Components/common/text";

import { directions } from "./about/data";
import { AboutQuery } from "../Admin/queries/__queries";
import { sanity } from "../Client/sanity/sanity-client";
import Slider from "../Slider/Slider";
import { PlansSlider } from "@/pages/project/Project";

const ThreeCanvas = dynamic(() => import("../../Models/construcetor"));

const { useBreakpoint } = Grid;

const PlotkinPhoto = styled.div`
  width: 47vw;
  padding-bottom: 110.6%;
  background-color: lightgrey;
  background: ${({ url }) => (url ? `url("${url}")` : `url("/about/p1.jpg")`)};
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

const CanvasGeometry = styled.div`
  position: absolute;
  opacity: 0.7;
  top: 80px;
  right: 0;
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

  const [aboutData, setAboutData] = useState();
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    const query = AboutQuery;

    sanity
      .fetch(query)
      .then((data) => {
        if (data && data.length > 0) {
          setAboutData(data[0]);
        }

        setFetched(true);
      })
      .catch(() => setFetched(true));
  }, []);

  if (!fetched) return <></>;

  return (
    <>
      <Content ref={contentRef}>
        <Gap sheight={`120px`} />
        <ContentFlex>
          <Gap swidth={`12.1vw`} />
          <LeadQuote>
            <Text60 data-font="wremena">{aboutData.block1}</Text60>
          </LeadQuote>
        </ContentFlex>

        <LeadDescription>
          <Text36 data-font="ibm">{aboutData.block2}</Text36>
        </LeadDescription>

        <Gap sheight={`120px`} />

        <ContentFlex direction={screens.lg ? "horizontal" : "vertical"}>
          {!screens.lg && (
            <Col>
              <PlotkinPhoto url={aboutData.block3_url}/>
            </Col>
          )}

          <Col>
            <LocalTitle size={48}>{aboutData.block3_title}</LocalTitle>
            <Text30>{aboutData.block3_label}</Text30>
            <Gap sheight={`64px`} />
            <ContentFlex style={screens.sm ? { paddingRight: "80px" } : {}}>
              <Gap swidth={`12.1vw`} />
              <VertFlex size={"20px"}>
                <Text24 style={{ whiteSpace: "pre-wrap" }}>
                  {!bioIsFull
                    ? aboutData.block3_content
                    : aboutData.block3_content}
                </Text24>
                {/* <ShowBtn onClick={() => SetBioIsFull(!bioIsFull)}>
                  <Text24 data-font="wremena">
                    {bioIsFull ? "Скрыть биографию" : "Раскрыть биографию"}
                  </Text24>
                  </ShowBtn> */}
              </VertFlex>
            </ContentFlex>
          </Col>
          {screens.lg && (
            <Col>
              <PlotkinPhoto url={aboutData.block3_url}/>
            </Col>
          )}
        </ContentFlex>

        <Gap sheight={`120px`} />

        <LeadDescription>
          <LocalTitle size={48}>{aboutData.block4_title}</LocalTitle>
          <Gap sheight={`24px`} />
          <Text36 data-font="ibm">{aboutData.block4_content}</Text36>
        </LeadDescription>

        <Gap sheight={`120px`} />

        <Row gutter={[24, 24]} style={{ width: "100%" }}>
          <Col span={screens.xl ? 12 : !screens.md ? 24 : 20}>
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

          {screens.md && (
            <Col span={12}>
              {screens.xl && (
                <CanvasGeometry>
                  <ThreeCanvas />
                </CanvasGeometry>
              )}

              <Row>
                <Col span={screens.xl ? 14 : 4}>
                  {
                    <Tip data-display={tooltip ? "show" : "hide"}>
                      <Text24 style={{ opacity: 0.7 }}>
                        {aboutData.block5_content}
                      </Text24>
                    </Tip>
                  }
                </Col>
              </Row>
            </Col>
          )}
        </Row>

        <Gap sheight={`120px`} />
      </Content>
      <PlansSlider>
        <Slider
          noFilter
          {...{ images: aboutData.slider.map((src) => ({ cover: src })) }}
          projectType
        />
      </PlansSlider>
    </>
  );
};

export default About;
