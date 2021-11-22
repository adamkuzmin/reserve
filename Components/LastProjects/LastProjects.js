import { useEffect, useRef } from "react";
import styled from "styled-components";
import {
  Text254,
  Text96,
  Text60,
  Text48,
  Text40,
  Text36,
  Text30,
  Text24,
} from "../common/text";

const Projects = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 8.3vw;
`;

Projects.Row = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 90px;

  && > * + * {
    margin-left: 4px;
  }
`;

Projects.Item = styled.div`
  width: ${({ swidth }) => (swidth ? `${swidth}%` : `100%`)};
  display: flex;
  flex-direction: column;
  cursor: pointer;

  & span[data-type="title"] {
    border-bottom: 3px solid white
  }

  &&:hover {
    & div[data-type="render"]::before {
      transform: scale(1);
      opacity: .9
    }

    & span[data-type="title"] {
      border-bottom: 3px solid black
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

  &&::before {
    content: "";
    width: 100%;
    height: 100%;
    background-image: url(${({ src }) => (src ? src : "")});
    background-size: cover;
    transform: scale(1.06);
    transition: transform .6s ease-in-out;
  }
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-right: 26px;
`;

Header.Title = styled.div`
  display: flex;
  flex-direction: column;

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
`;

const LPData = [
  [
    {
      category: "Жилой комлпекс",
      title: "Небо",
      year: 2021,
      render: "/renders/4.jpg",
      ratio: 60,
    },
    {
      category: "Объект культуры",
      title: "Концертный зал «Зарядье»",
      year: 2019,
      render: "/renders/5.jpg",
    },
  ],
  [
    {
      category: "Жилой комлпекс",
      title: "Концертный зал «Зарядье»",
      year: 2019,
      render: "/renders/6.jpg",
    },
    {
      category: "Жилой комлпекс",
      title: "Wine House",
      year: 2019,
      render: "/renders/7.jpg",
    },
  ],
  [
    {
      category: "Объект здравохранения",
      title: "Больница с родильным домом в Коммунарке",
      year: 2019,
      render: "/renders/8.jpg",
    },
    {
      category: "Жилой комлпекс",
      title: "Небо",
      year: 2019,
      render: "/renders/9.jpg",
      ratio: 60,
    },
  ],
];

const LastProjects = ({ BlackBlockIsScrolling, setBlackBlockIsScrolling }) => {
  const LPRef = useRef();

  useEffect(() => {
    const onScroll = (e) => {
      const BoundingRect = LPRef.current.getBoundingClientRect();

      if (
        BoundingRect.top <= 0 &&
        BoundingRect.bottom >= 0 &&
        BlackBlockIsScrolling
      ) {
        setBlackBlockIsScrolling(false);
      }
    };
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  });

  return (
    <Projects ref={LPRef}>
      {LPData.map((key, i) => {
        return (
          <Projects.Row key={`Projects.Row${i}`}>
            {key.map((project, b) => {
              return (
                <Projects.Item
                  swidth={project.ratio && project.ratio}
                  key={`Projects.Item${b}`}
                >
                  <Render data-type="render" src={project.render} />
                  <Header>
                    <Header.Title>
                      <p>
                        <Text30 data-font="wremena">{project.category}</Text30>
                      </p>
                      <h3>
                        <Text48 data-type="title">{project.title}</Text48>
                      </h3>
                    </Header.Title>
                    <Header.Year>
                      <Text30 data-font="wremena">{project.year}</Text30>
                    </Header.Year>
                  </Header>
                </Projects.Item>
              );
            })}
          </Projects.Row>
        );
      })}
      <WideButton data-font="wremena">
        <Text48>Все проекты</Text48>
      </WideButton>
    </Projects>
  );
};

export default LastProjects;
