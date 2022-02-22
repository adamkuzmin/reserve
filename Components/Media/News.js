import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { useStore } from "../../Store/useStore";

import { Content } from "../common/body";

import { Text30 } from "../common/text";

import { newsData, newsList, interviewData } from "./news/data";

import {
  ContentFlex,
  Gap,
  LocalTitle,
  VertFlex,
  LeadQuote,
  ShowBtn,
  LeadDescription,
} from "../About/common/styles";

const MainContent = styled.div`
  width: 100%;
  max-width: clamp(300px, 59vw, 1140px);

  display: flex;
  flex-direction: column;
`;

const BlockWrapper = styled.div`
  width: 100%;
  border-top: 1px solid black;

  display: flex;
  flex-direction: column;

  padding-top: 18px;
  padding-bottom: 18px;

  &:last-child {
    border-bottom: 1px solid black;
  }
`;

const NewsBlock = ({ title, date }) => {
  return (
    <BlockWrapper>
      <LocalTitle size={48}>{title}</LocalTitle>

      <Gap sheight={"36px"} />

      <Text30>{date}</Text30>
    </BlockWrapper>
  );
};

const News = ({ interviews = false }) => {
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

  return (
    <Content ref={contentRef}>
      <Gap sheight={"120px"} />

      <LocalTitle size={60}>
        {!interviews ? newsData.title[lang] : interviewData.title[lang]}
      </LocalTitle>
      <Gap sheight={"120px"} />

      <ContentFlex>
        <Gap swidth={`12.1vw`} />

        <MainContent>
          {newsList.map(({ title, date }, i) => {
            return (
              <NewsBlock
                key={`news:${i}`}
                title={title[lang]}
                date={date[lang]}
              />
            );
          })}
        </MainContent>
      </ContentFlex>

      <Gap sheight={"120px"} />
    </Content>
  );
};

export default News;
