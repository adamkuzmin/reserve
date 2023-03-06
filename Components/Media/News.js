import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import InfiniteScroll from "react-infinite-scroll-component";
import { useStore } from "../../Store/useStore";

import { Content } from "../common/body";

import { Text30 } from "../common/text";

import { newsData /* , newsList*/, interviewData } from "./news/data";

import { Skeleton, Row, Col, Space, Grid } from "antd";

import { ContentFlex, Gap, LocalTitle } from "../About/common/styles";
import groq from "groq";
import { sanity } from "../Client/sanity/sanity-client";
import moment from "moment";

const { useBreakpoint } = Grid;

const MainContent = styled.div`
  width: 100%;
  width: clamp(300px, 59vw, 1140px);
  max-width: clamp(300px, 59vw, 1140px);

  display: flex;
  flex-direction: column;

  @media (max-width: 576px) {
    &&& {
      min-width: 100%;
      width: 100%;
      max-width: 100%;
    }
  }
`;

const WireSpace = styled.div`
  width: 100%;
  margin-bottom: 48px;

  display: flex;
  flex-direction: column;

  && > * + * {
    margin-top: 24px;
  }
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

const WireItem = (props) => {
  return (
    <WireSpace {...props}>
      <Skeleton.Input
        size="large"
        style={{ maxWidth: "60%", marginBottom: "20px" }}
        active
      />
      <Skeleton.Input
        size="large"
        style={{ maxWidth: "100%", height: "30px" }}
        active
      />
      <Skeleton.Input
        size="large"
        style={{ maxWidth: "50%", height: "30px" }}
        active
      />
    </WireSpace>
  );
};

const WireWrapper = ({ children, loading }) => {
  if (!loading) return children;

  return (
    <>
      {Array(8)
        .fill(1)
        .map((_, i) => (
          <WireItem key={`wire:${i}`} />
        ))}
    </>
  );
};

const News = ({ interviews = false }) => {
  const logId = useStore(({ logId }) => logId);

  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const query = groq`
      *[_type == "${interviews ? "interviews" : "news"}"] {
        _id,
        name,
        cr
      }
      | order(cr desc)
    `;

    setLoading(true);

    sanity
      .fetch(query)
      .then((data = []) => {
        setNewsList(
          data.map((item = {}) => {
            const { name, cr } = item;

            const ftime = (cr, ln) =>
              moment(cr).locale(ln).format("MMM D, YYYY");

            const ruTime = ftime(cr, "ru");
            const enTime = ftime(cr, "en");

            return {
              title: { ru: name, en: name },
              date: { ru: ruTime, en: enTime },
            };
          })
        );
        setLoading(false);
      })
      .catch(console.error);
  }, [logId, interviews]);

  const [loadingData, setLoadingData] = useState(true);
  const screens = useBreakpoint();

  useEffect(() => {
    const showData = setTimeout(() => setLoadingData(false), 1800);
    return () => {
      clearTimeout(showData);
    };
  }, []);

  const lang = useStore((state) => state.lang);

  const [windowHeight, setWindowsHeight] = useState(0);
  const [data, setData] = useState([]);
  useEffect(() => {
    if (!(!loading && newsList)) {
      setData(newsList);
    }
  }, [newsList, loading]);

  useEffect(() => {
    const resizeListener = () => {
      setWindowsHeight(window.innerHeight);
    };

    setWindowsHeight(window.innerHeight);
    window.addEventListener("resize", resizeListener);

    return () => {
      window.removeEventListener("resize", resizeListener);
    };
  }, []);

  const setBlackLogo = useStore((state) => state.setBlackLogo);
  const blackLogo = useStore((state) => state.blackLogo);

  const loadMoreData = () => {
    setTimeout(() => {
      setData((state) => state.concat(newsList));
    }, 800);
  };

  /* настройка верхнего бара */
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
  /* */

  return (
    <Content ref={contentRef}>
      <Gap sheight={"120px"} />

      <LocalTitle size={60}>
        {!interviews ? newsData.title[lang] : interviewData.title[lang]}
      </LocalTitle>
      <Gap sheight={"120px"} />

      <ContentFlex>
        {screens.sm && <Gap swidth={`12.1vw`} />}

        <MainContent>
          <WireWrapper loading={loadingData}>
            {/* <InfiniteScroll
              dataLength={data.length} //This is important field to render the next data
              next={loadMoreData}
              hasMore={data.length < 100}
              loader={
                <>
                  <WireItem />
                  <WireItem />
                </>
              }
              endMessage={<></>}
              scrollThreshold={`${windowHeight * 0.8}px`}
            > */}
            {newsList &&
              !loading &&
              newsList.map(({ title, date }, i) => {
                return (
                  <NewsBlock
                    key={`news:${i}`}
                    title={title[lang]}
                    date={date[lang]}
                  />
                );
              })}
            {/* </InfiniteScroll> */}
          </WireWrapper>
        </MainContent>
      </ContentFlex>

      <Gap sheight={"120px"} />
    </Content>
  );
};

export default News;
