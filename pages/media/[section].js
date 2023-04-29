import React, { useEffect, useState } from "react";
import MediaFilters from "../../Components/Filters/MediaFilters";

import styled from "styled-components";

import Media from "./Media";
import News from "../../Components/Media/News";
import Publications from "../../Components/Media/Publications";

import { Content } from "../../Components/common/body";
import Navigation from "../../Components/Navigation/Navigation";
import NavRight from "../../Components/NavRight/NavRight";

import Footer from "../../Components/Footer/Footer";
import { useRouter } from "next/router";

const WrapperAnimation = styled.div`
  opacity: 0;
  transform: translateY(100px);

  animation: SectionAppear 0.7s ease-in-out 0.5s;
  @keyframes SectionAppear {
    0% {
      opacity: 0;
      transform: translateY(100px);
    }

    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  animation-fill-mode: forwards;
`;

const Section = ({ type = "all" }) => {
  switch (type) {
    case "all":
      return (
        <WrapperAnimation key="news">
          <News />
        </WrapperAnimation>
      );
    /* return (
        <div>
          <Media />
        </div>
      ); */

    case "news":
      return (
        <WrapperAnimation key="news">
          <News />
        </WrapperAnimation>
      );
    case "publications":
      return (
        <WrapperAnimation key="publications">
          <Publications />
        </WrapperAnimation>
      );
    case "interviews":
      return (
        <WrapperAnimation key="interviews">
          <News interviews />
        </WrapperAnimation>
      );
    case "exhibitions":
      return (
        <WrapperAnimation key="exhibitions">
          <Publications exhibitions />
        </WrapperAnimation>
      );
    default:
      return (
        <div>
          <Media />
        </div>
      );
  }
};

export default function HomeApp() {
  const [layoutType, setLayoutType] = useState("all");

  const router = useRouter();
  const { query } = router;
  const { await: _await } = query;

  useEffect(() => {
    if (router && router.query && router.query.section) {
      const s = router.query.section;

      if (!_await) {
        setLayoutType(s);
      } else {
        setLayoutType(_await);
      }
    }
  }, [router, _await]);

  return (
    <div>
      <MediaFilters {...{ layoutType, setLayoutType }} />

      <NavRight />
      <Navigation />

      <Section type={layoutType} />

      <Content background={"black"}>
        <Footer />
      </Content>
    </div>
  );
}
