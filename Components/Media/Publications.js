import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useStore } from "../../Store/useStore";

import { Content } from "../common/body";

import { Space } from "antd";

import { Text30 } from "../common/text";

import { publData, publIntro, exhIntro } from "./publications/data";

import {
  ContentFlex,
  Gap,
  LocalTitle,
  VertFlex,
  LeadQuote,
  ShowBtn,
  LeadDescription,
} from "../About/common/styles";
import { sanity } from "../Client/sanity/sanity-client";
import groq from "groq";
import moment from "moment";

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

  @media (max-width: 576px) {
    && {
      grid-template-columns: 1fr 1fr;
      column-gap: 2px;
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

/* не идентично */
Member.Photo = styled.div`
  width: 100%;
  padding-bottom: 129%;

  background-color: lightgrey;
  background-image: url(${({ url }) => (url ? `"${url}"` : `""`)});
  background-size: cover;
`;

const Publications = ({ exhibitions = false }) => {
  const logId = useStore(({ logId }) => logId);

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const query = groq`
      *[_type == "${exhibitions ? "exhibitions" : "publications"}"] {
        _id,
        name,
        cover,
        cr
      }
      | order(cr desc)
    `;

    setLoading(true);

    sanity
      .fetch(query)
      .then((data = []) => {
        setProjects(
          data.map((item = {}) => {
            const { name, cover } = item;

            return {
              title: { ru: name, en: name },
              url: cover,
            };
          })
        );
        setLoading(false);
      })
      .catch(console.error);
  }, [logId, exhibitions]);

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
        {exhibitions ? exhIntro.title[lang] : publIntro.title[lang]}
      </LocalTitle>
      <Gap sheight={"120px"} />

      <MembersWrapper data-col={3}>
        {!loading &&
          projects &&
          projects.map(({ url, title }, i) => {
            return (
              <Member key={`publ:${i}`}>
                <Member.Photo url={url} />

                <Space direction="vertical" size={0}>
                  <LocalTitle size={30}>{title[lang]}</LocalTitle>
                </Space>
              </Member>
            );
          })}
      </MembersWrapper>

      <Gap sheight={"120px"} />
    </Content>
  );
};

export default Publications;
