import React, { useEffect, useRef } from "react";
import styled from "styled-components";

import { useStore } from "../../Store/useStore";

const ProjectCoverWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: grey;
  background-size: cover;
  background-image: url("/renders/18.jpg");
  background-position: left bottom;
  background-attachment: fixed;

  @media (max-width: 576px) {
    & {
      background-position: center bottom;
      background-attachment: unset;
    }
  }
`;

const ProjectCover = ({ scrolling = () => {} }) => {
  const setBlackLogo = useStore((state) => state.setBlackLogo);
  const blackLogo = useStore((state) => state.blackLogo);

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

  return <ProjectCoverWrapper ref={contentRef} scrolling={scrolling} />;
};

export default ProjectCover;
