import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useStore } from "../../Store/useStore";

import { ContentFlex, Gap, LocalTitle, VertFlex } from "./common/styles";

import { Text254, Text48, Text36, Text30, Text24 } from "../common/text";
import { Col, Space, Grid, Row } from "antd";
import { Content } from "../common/body";

import { intro, plotkin, team1, team2 } from "./team/data";
import { useRouter } from "next/router";
import { TeamQuery } from "../Admin/queries/__queries";
import { sanity } from "../Client/sanity/sanity-client";
import { PlansSlider } from "@/pages/project/Project";
import Slider from "../Slider/Slider";

const { useBreakpoint } = Grid;

const People = styled.div`
  width: 100vw;
  height: 20vw;

  @media (max-width: 576px) {
    height: 58vw;
  }

  @media (min-width: 576px) and (max-width: 1200px) {
    height: 35vw;
  }

  background: url("/about/p3.jpg");
  background-size: cover;
  background-position: center;
`;

const PlotkinPhoto = styled.div`
  width: 100%;
  padding-bottom: 117%;
  background-color: lightgrey;

  background: ${({ url }) => (url ? `url("${url}")` : `url("/about/p4.jpg")`)};
  background-size: cover;
`;

const Intro = styled.div`
  display: flex;
  width: 100%;
  max-width: calc(100%);

  & > * + * {
    margin-left: 40px;
  }

  @media (max-width: 1000px) {
    flex-direction: column;
    align-items: flex-end;

    & > * + * {
      margin-top: 40px;
    }
  }
`;

const MembersWrapper = styled.div`
  width: 100%;

  display: grid;

  &[data-col="3"] {
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 100px;
    row-gap: 70px;

    @media (max-width: 480px) {
      & {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 1200px) and (min-width: 480px) {
      & {
        grid-template-columns: 1fr 1fr;
      }
    }
  }

  &[data-col="4"] {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    column-gap: 60px;
    row-gap: 70px;

    @media (max-width: 1200px) {
      & {
        grid-template-columns: 1fr 1fr 1fr;
      }
    }
  }
`;

const Member = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  & > * + * {
    margin-top: 18px;
  }
`;

Member.Photo = styled.div`
  width: 100%;
  padding-bottom: 129%;

  background-color: lightgrey;
  background-image: url(${({ url }) => (url ? `"${url}"` : `""`)});
  background-size: cover;
`;

const BackImage = styled.div`
  width: 100vw;
  height: 55.6vw;

  background: url("/about/office/2.jpg");
  background-size: cover;
`;

const TeamList = ({ title, members, lang, col = 3 }) => {
  return (
    <>
      <Gap sheight={"120px"} />
      <LocalTitle size={48}>{title[lang]}</LocalTitle>
      <Gap sheight={"60px"} />

      <MembersWrapper data-col={`${col}`}>
        {members.map(({ name, whois, photo }, i) => {
          return (
            <Member key={`member:${i}`}>
              <Member.Photo url={photo} />

              <Space direction="vertical" size={0}>
                <LocalTitle size={30}>{name[lang]}</LocalTitle>
                <Gap sheight={"4px"} />
                {col < 4 && <Text24 data-font="wremena">{whois[lang]}</Text24>}
              </Space>
            </Member>
          );
        })}
      </MembersWrapper>
    </>
  );
};

const Team = () => {
  const [info, setInfo] = useState();
  const [members, setMembers] = useState();
  const [isFetched, setFetched] = useState(false);

  const router = useRouter();

  const logId = useStore(({ logId }) => logId);

  useEffect(() => {
    const query = TeamQuery;

    sanity
      .fetch(query)
      .then((data) => {
        const { team, members = [] } = data;

        setInfo(team);
        setMembers(members);

        setFetched(true);
      })
      .catch(() => setFetched(true));
  }, [logId]);

  const screens = useBreakpoint();

  const lang = useStore((state) => state.lang);

  const setBlackLogo = useStore((state) => state.setBlackLogo);
  const blackLogo = useStore((state) => state.blackLogo);

  useEffect(() => {
    setBlackLogo(true);
  }, []);

  const contentRef = useRef();
  const contentRef1 = useRef();

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

  if (!(isFetched && info))
    return (
      <>
        <Content ref={contentRef}>
          <Gap sheight={`120px`} />
        </Content>
      </>
    );

  return (
    <>
      <Content ref={contentRef}>
        <Gap sheight={`120px`} />
        <LocalTitle size={60}>{intro.title[lang]}</LocalTitle>
      </Content>

      <People />

      <Content ref={contentRef1}>
        <Intro>
          <Text36>{info.block1_content}</Text36>
          <ContentFlex align="flex-end">
            <Text48 style={{ minWidth: "min-content" }}>
              {intro.kpi.label[lang]}
            </Text48>
            <Text254 data-type="kpi">{info.block1_int}</Text254>
          </ContentFlex>
        </Intro>

        <Gap sheight={`72px`} />
        <LocalTitle size={48}>{info.block2_title}</LocalTitle>

        <Gap sheight={screens.md ? "80px" : "24px"} />

        <Row gutter={[40, 40]}>
          {!screens.md && (
            <Col span={24}>
              <PlotkinPhoto />
            </Col>
          )}

          <Col span={screens.md ? 12 : 24}>
            <ContentFlex>
              {screens.xl && <Gap swidth={"8.1vw"} />}

              <VertFlex>
                <Text48 data-font="wremena">{info.block2_content}</Text48>

                <Gap sheight={"70px"} />

                <VertFlex>
                  <LocalTitle size={36}>{info.block2_name}</LocalTitle>
                  <Text30 data-font="wremena">{info.block2_label}</Text30>
                </VertFlex>
              </VertFlex>
              <Gap swidth={"40px"} />
            </ContentFlex>
          </Col>

          {screens.md && (
            <Col span={12}>
              <PlotkinPhoto url={info.block2_url} />
            </Col>
          )}
        </Row>

        {members &&
          members.map((section = {}) => {
            const { _id, name, members: children = [] } = section;

            return (
              <TeamList
                key={`d:${_id}`}
                title={{ ru: name, en: name }}
                members={
                  children
                    ? children.map((member = {}) => {
                        const { name, label, url } = member;

                        return {
                          name: {
                            ru: name,
                            en: name,
                          },
                          whois: {
                            ru: label,
                            en: label,
                          },
                          photo: url,
                        };
                      })
                    : []
                }
                lang={lang}
                col={3}
              />
            );
          })}
      </Content>

      <Gap sheight={"180px"} />
      <PlansSlider>
        <Slider
          noFilter
          {...{
            images:
              info && info.slider
                ? info.slider.map((src) => ({ cover: src }))
                : [],
          }}
          projectType
        />
      </PlansSlider>
    </>
  );
};

export default Team;
