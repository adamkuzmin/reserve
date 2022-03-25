import { useEffect, useRef } from "react";
import Link from "next/link";
import { useStore } from "../../Store/useStore";
import styled from "styled-components";
import { Text48, Text40, Text36, Text30, Text24 } from "../common/text";
import { projectData } from "../ProjectsLayout/data/data";

import { Grid } from "antd";
const { useBreakpoint } = Grid;

const transValue = "800px";

const Projects = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 8vw;
`;

Projects.Row = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 90px;

  && > * + * {
    margin-left: 4px;
  }

  @media (max-width: ${transValue}) {
    &&& {
      flex-direction: column;
      margin-bottom: clamp(30px, 10vw, 70px) !important;

      & > * + * {
        margin-top: clamp(30px, 10vw, 70px) !important;
        margin-left: 0px !important;
      }
    }
  }
`;

Projects.Item = styled.div`
  width: ${({ swidth }) => (swidth ? `${swidth}%` : `100%`)};
  display: flex;
  flex-direction: column;
  cursor: pointer;

  @media (max-width: ${transValue}) {
    & {
      width: 100%;
    }
  }

  & span[data-type="title"] {
    border-bottom: 3px solid white;
  }

  &&:hover {
    & div[data-type="render"]::before {
      transform: scale(1);
      opacity: 0.9;
    }

    & span[data-type="title"] {
      border-bottom: 3px solid black;
    }
  }
`;

const Render = styled.div`
  width: 100%;
  height: 38.75vw;
  background: black;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  @media (max-width: ${transValue}) {
    &&&& {
      height: auto;
      padding-bottom: calc(9 / 16 * 100%);
      position: relative;
      background-image: url(${({ src }) => (src ? src : "")});
      background-size: cover;
      background-position: center;

      &::before {
        display: none;
      }
    }
  }

  &&::before {
    content: "";
    width: 100%;
    height: 100%;
    background-image: url(${({ src }) => (src ? src : "")});
    background-size: cover;
    background-position: center;
    transform: scale(1.06);
    transition: transform 0.6s ease-in-out;
  }
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-right: 26px;
  margin-top: 16px;

  @media (max-width: 768px) {
    && {
      padding-right: 0px !important;
      margin-top: clamp(8px, 2vw, 16px);
    }
  }
`;

Header.Title = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: 40px;

  && p,
  && h3 {
    line-height: 1;
    margin-bottom: 0px;
  }

  && p {
    line-height: 1.46;
    font-weight: 400;
  }
`;

Header.Year = styled.div`
  line-height: 1.46;
  padding-left: 20px;
  font-weight: 300;
`;

const WideButton = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0;
  height: 178px;
  border: 1px solid black;
  color: black;
  margin-bottom: 15vw;

  &&:hover {
    background: black;
    color: white;
    cursor: pointer;
  }

  @media (max-width: 768px) {
    &&& {
      height: clamp(45px, 18vw, 147px);
    }
  }
`;

const LastProjects = () => {
  const screens = useBreakpoint();

  const blackLogo = useStore((state) => state.blackLogo);
  const setBlackLogo = useStore((state) => state.setBlackLogo);

  const lang = useStore((state) => state.lang);

  const LPRef = useRef();

  useEffect(() => {
    const onScroll = (e) => {
      if (LPRef && LPRef.current) {
        const BoundingRect = LPRef.current.getBoundingClientRect();

        if (BoundingRect.top <= 0 && BoundingRect.bottom >= 0 && !blackLogo) {
          setBlackLogo(true);
        }
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  });

  const ratios = [
    [60, null],
    [null, null],
    [null, 60],
  ];
  let projectsDataCopy = [...projectData];

  let LastProjects = [];
  for (let i = 0; i < 3; i++) {
    LastProjects.push(projectsDataCopy.slice(i * 2, i * 2 + 2));
  }

  return (
    <Projects ref={LPRef}>
      {LastProjects &&
        LastProjects.map((key, i) => {
          return (
            <Projects.Row key={`Projects.Row${i}`}>
              {key.map((project, b) => {
                const { nameru, nameen, finished } = project;
                const { coververt, coverhor } = project;

                const category =
                  lang === "ru" ? "Объект культуры" : "Culture Object";
                const title = lang === "ru" ? nameru : nameen;

                const metaRatio =
                  ratios[i][b] === 60 && screens.md ? coverhor : coververt;
                const metaSrc = `/projects/Frame%20${metaRatio}.jpg`;

                return (
                  <Projects.Item
                    onClick={() => (location.href = "/project")}
                    swidth={ratios[i][b]}
                    key={`Projects.Item${b}`}
                  >
                    <Render data-type="render" src={metaSrc} />
                    <Header>
                      <Header.Title>
                        <p>
                          <Text24 data-font="wremena">{category}</Text24>
                        </p>
                        <h3>
                          <Text36 data-type="title">{title}</Text36>
                        </h3>
                      </Header.Title>
                      <Header.Year>
                        <Text24 data-font="wremena">{finished}</Text24>
                      </Header.Year>
                    </Header>
                  </Projects.Item>
                );
              })}
            </Projects.Row>
          );
        })}
      <Link href="/projects">
        <a>
          <WideButton data-font="wremena">
            <Text48>{lang === "ru" ? "Все проекты" : "All projects"}</Text48>
          </WideButton>
        </a>
      </Link>
    </Projects>
  );
};

export default LastProjects;
