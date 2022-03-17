import React from "react";
import styled from "styled-components";

/* Layout */
const Layout = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 10vw;
  transform-style: preserve-3d;

  && > * + * {
    margin-top: 4px;
  }

  &&[data-position="left"],
  &&[data-position="right"] {
    position: absolute;
    top: 0;
  }

  &&[data-position="left"] {
    transform: translateX(-100%);
  }

  &&[data-position="right"] {
    transform: translateX(100%);
  }
`;

Layout.Row = styled.div`
  display: flex;
  width: 100%;
  transform-style: preserve-3d;

  && > * + * {
    margin-left: 4px;
  }
`;

Layout.Col = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  transform-style: preserve-3d;

  && > * + * {
    margin-top: 4px;
  }
`;

Layout.Project = styled.div`
  background-color: white;
  width: ${({ swidth }) => (swidth ? `${swidth}%` : `100%`)};
  min-height: 25.5vw;
  position: relative;
  overflow: hidden;
  transform-style: preserve-3d;

  &&[data-effect="fade"] {
    transform: translateZ(-1200px);
    opacity: 0;

    animation: ImageRender 3.5s ease-in-out
      ${({ randomtime }) => (randomtime ? `${randomtime * 1.2 + 2}s` : `2.5s`)};
    @keyframes ImageRender {
      0% {
        opacity: 0;
        transform: translateZ(-1200px);
      }

      30% {
        opacity: 1;
        transform: translateZ(-1000px);
      }

      60% {
        opacity: 1;
        transform: translateZ(-1000px);
      }

      100% {
        opacity: 1;
        transform: translateZ(0px);
      }
    }

    animation-fill-mode: forwards;
  }

  &&:hover *[data-type="card-header"] {
    cursor: pointer;
    opacity: 1;
  }

  &&:hover {
    & *[data-type="text-wrapper"] > * {
      transform: translate3d(0, 0%, 0);
    }
  }
`;
/* */

/*  Inner content of card */
const Render = styled.div`
  background-color: grey;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background-image: url(${({ src }) => (src ? src : "")});
  background-size: cover;
  position: absolute;
  opacity: 1;
`;

const Header = styled.div`
  width: 100%;
  height: 100%;
  background: white;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  opacity: 0;
`;

Header.Title = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  && p,
  && h3 {
    line-height: 1;
    margin-bottom: 0px;
    text-align: center;
  }

  && p {
    line-height: 1.46;
    font-weight: 400;
  }
`;

Header.Year = styled.div`
  position: absolute;
  bottom: 30px;
  right: 30px;
`;

const TextWrapper = styled.div`
  overflow: hidden;

  & > * {
    transform: translate3d(
      0,
      ${({ direction }) => (direction ? `${direction}%` : "100%")},
      0
    );
    transition: transform 0.6s ease-in-out;
  }
`;
/* */

export { Layout, Header, Render, TextWrapper };
