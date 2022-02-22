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

  animation: SectionAppear .7s ease-in-out .5s;
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

export default function HomeApp() {
  const [layoutType, setLayoutType] = useState(1);

  const router = useRouter();

  useEffect(() => {
    if (router && router.query && router.query.section) {
      const s = router.query.section;

      setLayoutType(parseInt(s));
    }
  }, [router]);

  return (
    <div>
      <MediaFilters {...{ layoutType, setLayoutType }} />

      <NavRight />
      <Navigation />

      {
        /* Все разделы медиа */
        layoutType === 1 && (
          <div>
            <Media />
          </div>
        )
        /* */
      }

      {
        /* Все разделы медиа */
        layoutType === 2 && (
          <WrapperAnimation>
            <News />
          </WrapperAnimation>
        )
        /* */
      }

      {
        /* Все разделы медиа */
        layoutType === 3 && (
          <WrapperAnimation>
            <Publications />
          </WrapperAnimation>
        )
        /* */
      }

      {
        /* Все разделы медиа */
        layoutType === 4 && (
          <WrapperAnimation>
            <News interviews />
          </WrapperAnimation>
        )
        /* */
      }

      {
        /* Все разделы медиа */
        layoutType === 5 && (
          <WrapperAnimation>
            <Publications exhibitions />
          </WrapperAnimation>
        )
        /* */
      }

      <Content background={"black"}>
        <Footer />
      </Content>
    </div>
  );
}
