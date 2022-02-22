import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { useStore } from "../../Store/useStore";

import { Content } from "../common/body";
import {
  ContentFlex,
  Gap,
  LocalTitle,
  VertFlex,
  LeadQuote,
  ShowBtn,
} from "./common/styles";

import { Text60, Text48, Text36, Text30, Text24 } from "../common/text";
import { cover, career } from "./career/data";

const BackCover = styled.div`
  width: 100vw;
  min-height: 41vw;

  background: url("/about/p5.jpg");
  background-size: cover;
`;

const MainContent = styled.div`
  width: 100%;
  max-width: clamp(300px, 59vw, 1140px);

  display: flex;
  flex-direction: column;
`;

const Career = () => {
  const lang = useStore((state) => state.lang);

  const setBlackLogo = useStore((state) => state.setBlackLogo);
  const blackLogo = useStore((state) => state.blackLogo);

  useEffect(() => {
    setBlackLogo(false);
  }, []);

  const backRef = useRef();
  const contentRef = useRef();

  useEffect(() => {
    const onScroll = () => {
      if (backRef && backRef.current) {
        const maincontent = backRef.current.getBoundingClientRect();

        if (maincontent.top <= 0 && maincontent.bottom >= 0 && blackLogo) {
          setBlackLogo(false);
        }
      }

      if (contentRef && contentRef.current) {
        const maincontent1 = contentRef.current.getBoundingClientRect();

        if (maincontent1.top <= 0 && maincontent1.bottom >= 0 && !blackLogo) {
          setBlackLogo(true);
        }
      }
    };
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  });

  return (
    <>
      <BackCover ref={backRef}>
        <Content background="none">
          <Gap sheight={"120px"} />
          <LocalTitle size={60} style={{ color: "white" }}>
            {cover.title[lang]}
          </LocalTitle>
          <Gap sheight={"60px"} />

          <ContentFlex>
            <Gap swidth={`12.1vw`} />
            <LeadQuote>
              <Text60 style={{ color: "white" }} data-font="wremena">
                {cover.descr[lang]}
              </Text60>
            </LeadQuote>
          </ContentFlex>

          <Gap sheight={"120px"} />
        </Content>
      </BackCover>

      <Content ref={contentRef}>
        <Gap sheight={"80px"} />
        <LocalTitle size={60}>{career.title[lang]}</LocalTitle>

        <Gap sheight={"80px"} />

        <ContentFlex>
          <Gap swidth={`12.1vw`} />

          <MainContent>
            <Text36 style={{ color: "#939393" }}>{career.nojobs[lang]}</Text36>
            <Gap sheight={`90px`} />

            <LocalTitle size={48}>{career.jobs[0].title[lang]}</LocalTitle>
            <Gap sheight={`36px`} />
            <Text30>{career.jobs[0].descr[lang]}</Text30>
            <Gap sheight={`24px`} />
            <ShowBtn>
              <Text24 data-font="wremena">
                {lang === "ru" ? "Откликнуться" : "Apply for the job"}
              </Text24>
            </ShowBtn>

            <Gap sheight={`90px`} />

            <LocalTitle size={48}>{career.jobs[1].title[lang]}</LocalTitle>
            <Gap sheight={`36px`} />
            <Text30>{career.jobs[1].descr[lang]}</Text30>
            <Gap sheight={`24px`} />
            <ShowBtn>
              <Text24 data-font="wremena">
                {lang === "ru" ? "Откликнуться" : "Apply for the job"}
              </Text24>
            </ShowBtn>
          </MainContent>
        </ContentFlex>
      </Content>

      <Gap sheight={"120px"} />
    </>
  );
};

export default Career;
