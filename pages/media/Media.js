import styled from "styled-components";
import { Typography } from "antd";

import Navigation from "../../Components/Navigation/Navigation";
import NavRight from "../../Components/NavRight/NavRight";

import AllMedia from "../../Components/LastMedia/AllMedia";
import Footer from "../../Components/Footer/Footer";
import { Content } from "../../Components/common/body";
import { useEffect, useRef, useState } from "react";

const { Paragraph } = Typography;

const Media = ({ PreloadIsHidden }) => {
  const [MiniNavIsOpened, setMiniNavIsOpened] = useState(false);
  const [BlackBlockIsScrolling, setBlackBlockIsScrolling] = useState(true);

  const BodyRef = useRef();
  const DescriptionRef = useRef();
  const LastProjectsRef = useRef();

  useEffect(() => {
    const onScroll = (e) => {
      if (DescriptionRef && DescriptionRef.current) {
        const BoundingRect = DescriptionRef.current.getBoundingClientRect();

        if (
          BoundingRect.top <= 0 &&
          BoundingRect.bottom >= 0 &&
          BlackBlockIsScrolling
        ) {
          setBlackBlockIsScrolling(false);
        }

        const BoundingRect1 = LastProjectsRef.current.getBoundingClientRect();

        if (
          BoundingRect1.top <= 0 &&
          BoundingRect1.bottom >= 0 &&
          BlackBlockIsScrolling
        ) {
          setBlackBlockIsScrolling(false);
        }
      }
      window.addEventListener("scroll", onScroll);

      return () => window.removeEventListener("scroll", onScroll);
    };
  });

  return (
    <div ref={BodyRef}>
      <NavRight {...{ MiniNavIsOpened }} />
      <Navigation
        {...{
          MiniNavIsOpened,
          setMiniNavIsOpened,
          BlackBlockIsScrolling,
          setBlackBlockIsScrolling,
        }}
      />

      <Content background={"black"}>
        <AllMedia {...{ BlackBlockIsScrolling, setBlackBlockIsScrolling }} />
      </Content>
      <Content background={"black"}>
        <Footer {...{ BlackBlockIsScrolling, setBlackBlockIsScrolling }} />
      </Content>
    </div>
  );
};

export default Media;
