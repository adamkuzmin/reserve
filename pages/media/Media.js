import { useStore } from "../../Store/useStore";
import styled from "styled-components";
import { Typography } from "antd";

import Navigation from "../../Components/Navigation/Navigation";
import NavRight from "../../Components/NavRight/NavRight";

import AllMedia from "../../Components/LastMedia/AllMedia";
import Footer from "../../Components/Footer/Footer";
import { Content } from "../../Components/common/body";
import { useEffect, useRef, useState } from "react";

const { Paragraph } = Typography;

const Media = () => {
  const blackLogo = useStore((state) => state.blackLogo);
  const setBlackLogo = useStore((state) => state.setBlackLogo);

  const BodyRef = useRef();
  const DescriptionRef = useRef();
  const LastProjectsRef = useRef();

  useEffect(() => {
    const onScroll = (e) => {
      if (DescriptionRef && DescriptionRef.current) {
        const BoundingRect = DescriptionRef.current.getBoundingClientRect();

        if (BoundingRect.top <= 0 && BoundingRect.bottom >= 0 && !blackLogo) {
          setBlackLogo(true);
        }

        const BoundingRect1 = LastProjectsRef.current.getBoundingClientRect();

        if (BoundingRect1.top <= 0 && BoundingRect1.bottom >= 0 && !blackLogo) {
          setBlackLogo(true);
        }
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  });

  useEffect(() => {
    setBlackLogo(false);
  }, []);

  return (
    <div ref={BodyRef}>
      <Content background={"black"}>
        <AllMedia />
      </Content>
    </div>
  );
};

export default Media;
