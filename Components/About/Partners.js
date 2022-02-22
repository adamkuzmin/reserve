import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { useStore } from "../../Store/useStore";

import { Text36, Text30 } from "../common/text";

import { Content } from "../common/body";

import {
  ContentFlex,
  Gap,
  LocalTitle,
  VertFlex,
  LeadQuote,
  ShowBtn,
  LeadDescription,
} from "./common/styles";

import { intro, partnersData } from "./partners/data";

const Partners = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

Partners.Row = styled.div`
  width: 100%;
  border-top: 1px solid black;

  &&:last-child {
    border-bottom: 1px solid black;
  }

  display: flex;
  height: 70px;
  align-items: center;
`;

Partners.Col = styled.div`
  height: 100%;
  width: 100%;

  display: flex;
  align-items: center;

  justify-content: space-between;
`;

const FeedbackLink = styled.div`
  padding-right: 80px;

  & > * {
    border-bottom: 2px solid black;
  }
`;

const Awards = () => {
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
    <>
      <Content ref={contentRef}>
        <Gap sheight={"120px"} />

        <LocalTitle size={60}>{intro.title[lang]}</LocalTitle>
        <Gap sheight={"60px"} />

        <LeadDescription>
          <Text36>{intro.descr[lang]}</Text36>
        </LeadDescription>

        <Gap sheight={"120px"} />

        <Partners>
          {partnersData.map(({ feedback, name, location }) => {
            return (
              <Partners.Row>
                <Partners.Col>
                  <Text30>{name[lang]}</Text30>
                </Partners.Col>
                <Partners.Col>
                  <Text30>{location[lang]}</Text30>
                  {location && (
                    <FeedbackLink>
                      <Text30>Отзыв</Text30>
                    </FeedbackLink>
                  )}
                </Partners.Col>
              </Partners.Row>
            );
          })}
        </Partners>

        <Gap sheight={"120px"} />
      </Content>
    </>
  );
};

export default Awards;
