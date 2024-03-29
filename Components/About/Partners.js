import React, { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { useStore } from "../../Store/useStore";

import { Text36, Text30, Text24 } from "../common/text";

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
import { PartnersHeaderQuery, PartnersQuery } from "../Admin/queries/__queries";
import { sanity } from "../Client/sanity/sanity-client";
import { Tooltip } from "antd";

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
  const [partners, setPartners] = useState();
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    const query = PartnersQuery;

    sanity
      .fetch(query)
      .then((data) => {
        setPartners(data);

        setFetched(true);
      })
      .catch(() => setFetched(true));
  }, []);

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

  const [values, setValues] = useState();
  const [isFetched1, setFetched1] = useState(false);

  useEffect(() => {
    const query = PartnersHeaderQuery;

    sanity
      .fetch(query)
      .then((data) => {
        setValues(data);
        setFetched1(true);
      })
      .catch(() => setFetched1(true));
  }, []);

  const initialValues = useMemo(() => {
    if (!(values && isFetched1)) return;

    if (values.length > 0) return values[0];
  }, [values, isFetched1]);

  return (
    <>
      <Content ref={contentRef}>
        <Gap sheight={"120px"} />

        <LocalTitle size={60}>{intro.title[lang]}</LocalTitle>
        <Gap sheight={"60px"} />

        <LeadDescription>
          {initialValues && <Text36>{initialValues.description}</Text36>}
        </LeadDescription>

        <Gap sheight={"120px"} />

        <Partners>
          {partners &&
            partners.map(({ feedback, name, location, review }) => {
              return (
                <Partners.Row>
                  <Partners.Col>
                    <Text30>{name}</Text30>
                  </Partners.Col>
                  <Partners.Col>
                    <Text30>{location}</Text30>
                    {review && (
                      <FeedbackLink>
                        <Tooltip
                          title={<Text24>{review}</Text24>}
                          placement={"top"}
                        >
                          <Text30>Отзыв</Text30>
                        </Tooltip>
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
