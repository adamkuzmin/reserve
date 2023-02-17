import React, { useEffect, useRef } from "react";
import styled from "styled-components";

import { useStore } from "../../Store/useStore";

const ProjectCoverWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: grey;
  background-size: cover;
  background-image: url("${({ src }) => (src ? src : "")}");
  background-position: left bottom;
  background-attachment: fixed;

  @media (max-width: 576px) {
    & {
      background-position: center bottom;
      background-attachment: unset;
    }
  }
`;

const ProjectCover = ({ scrolling = () => {}, initialValues = {} }) => {
  const setBlackLogo = useStore((state) => state.setBlackLogo);
  const blackLogo = useStore((state) => state.blackLogo);

  const { main_img = "" } = initialValues;

  const contentRef = useRef();

  useEffect(() => {
    const onScroll = () => {
      if (contentRef && contentRef.current) {
        const maincontent = contentRef.current.getBoundingClientRect();

        if (maincontent.top <= 0 && maincontent.bottom >= 0 && blackLogo) {
          setBlackLogo(false);
        }
      }
    };
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  });

  return (
    <ProjectCoverWrapper
      {...{ src: main_img }}
      ref={contentRef}
      scrolling={scrolling}
    />
  );
};

export default ProjectCover;
