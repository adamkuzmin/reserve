import React from "react";
import styled from "styled-components";
import { useStore } from "../../Store/useStore";

import { ContentFlex, Gap, LocalTitle, VertFlex } from "./common/styles";

import { Text254, Text48, Text36, Text30 } from "../common/text";
import { Col, Space } from "antd";
import { Content } from "../common/body";

import { intro, plotkin, team1 } from "./team/data";

const People = styled.div`
  width: 100vw;
  height: 17vw;

  background: url("/about/p3.jpg");
  background-size: cover;
  background-position: center;
`;

const PlotkinPhoto = styled.div`
  width: 100%;
  padding-bottom: 117%;
  background-color: lightgrey;

  background: url("/about/p4.jpg");
  background-size: cover;
`;

const Intro = styled.div`
  display: flex;
  width: 100%;

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
  }

  &[data-col="4"] {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    column-gap: 60px;
    row-gap: 70px;
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
                <LocalTitle size={36}>{name[lang]}</LocalTitle>
                {col < 4 && <Text30 data-font="wremena">{whois[lang]}</Text30>}
              </Space>
            </Member>
          );
        })}
      </MembersWrapper>
    </>
  );
};

const Team = () => {
  const lang = useStore((state) => state.lang);

  return (
    <>
      <Content>
        <Gap sheight={`120px`} />
        <LocalTitle size={60}>{intro.title[lang]}</LocalTitle>
      </Content>

      <People />

      <Content>
        <Intro>
          <Text36>{intro.descr[lang]}</Text36>
          <ContentFlex align="flex-end">
            <Text48 style={{ minWidth: "max-content" }}>
              {intro.kpi.label[lang]}
            </Text48>
            <Text254 data-type="kpi">{intro.kpi.count}</Text254>
          </ContentFlex>
        </Intro>

        <Gap sheight={`72px`} />
        <LocalTitle size={48}>{plotkin.title[lang]}</LocalTitle>

        <Gap sheight={"80px"} />

        <ContentFlex data-columns="eq">
          <Col>
            <ContentFlex>
              <Gap swidth={"8.1vw"} />

              <VertFlex>
                <Text48 data-font="wremena">{plotkin.descr[lang]}</Text48>
                <Gap sheight={"70px"} />
                <VertFlex>
                  <LocalTitle size={36}>{plotkin.name[lang]}</LocalTitle>
                  <Text30 data-font="wremena">{plotkin.whois[lang]}</Text30>
                </VertFlex>
              </VertFlex>
              <Gap swidth={"40px"} />
            </ContentFlex>
          </Col>
          <Col>
            <PlotkinPhoto />
          </Col>
        </ContentFlex>

        <TeamList
          title={team1.title}
          members={team1.members}
          lang={lang}
          col={3}
        />

        <TeamList
          title={team1.title}
          members={team1.members}
          lang={lang}
          col={3}
        />

        <TeamList
          title={team1.title}
          members={team1.members}
          lang={lang}
          col={4}
        />
      </Content>

      <Gap sheight={"180px"} />
    </>
  );
};

export default Team;
