import styled from "styled-components";

import { Text48, Text30 } from "../common/text";
import { useEffect, useState } from "react";

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
      ${({ randomtime }) =>
        randomtime ? `${randomtime * 1.2 + 2}s` : `2.5s`};
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

Layout.Card = ({ swidth, src, IsGalleryAnimation }) => {
  const [RandomTime, setRandomTime] = useState(0);

  useEffect(() => {
    setRandomTime(Math.random());
  }, []);

  return (
    <Layout.Project
      {...{ swidth, randomtime: RandomTime }}
      data-effect={IsGalleryAnimation && "fade"}
    >
      <Render {...{ src }} />
      <Header data-type="card-header">
        <Header.Title>
          <TextWrapper data-type="text-wrapper" direction={-100}>
            <p>
              <Text30 data-font="wremena">Объект культуры</Text30>
            </p>
          </TextWrapper>
          <TextWrapper data-type="text-wrapper" direction={100}>
            <h3>
              <Text48 data-type="title">Концертный зал «Зарядье»</Text48>
            </h3>
          </TextWrapper>
        </Header.Title>
        <Header.Year>
          <TextWrapper data-type="text-wrapper">
            <div>
              <Text30 data-font="wremena" direction={-100}>
                2018
              </Text30>
            </div>
          </TextWrapper>
        </Header.Year>
      </Header>
    </Layout.Project>
  );
};

const OneColumnGallery = ({ position, IsGalleryAnimation }) => (
  <Layout data-position={position && position}>
    <Layout.Row>
      <Layout.Card
        swidth={57}
        src={"/catalog/1.jpg"}
        {...{ IsGalleryAnimation }}
      />
      <Layout.Col>
        <Layout.Card src={"/catalog/2.jpg"} {...{ IsGalleryAnimation }} />
        <Layout.Row>
          <Layout.Card src={"/catalog/3.jpg"} {...{ IsGalleryAnimation }} />
          <Layout.Card
            src={"/catalog/4.jpg"}
            swidth={60}
            {...{ IsGalleryAnimation }}
          />
        </Layout.Row>
      </Layout.Col>
    </Layout.Row>

    <Layout.Row>
      <Layout.Card
        src={"/catalog/5.jpg"}
        swidth={60}
        {...{ IsGalleryAnimation }}
      />
      <Layout.Card src={"/catalog/6.jpg"} {...{ IsGalleryAnimation }} />
      <Layout.Card
        src={"/catalog/7.jpg"}
        swidth={90}
        {...{ IsGalleryAnimation }}
      />
    </Layout.Row>
    <Layout.Row>
      <Layout.Card
        src={"/catalog/8.jpg"}
        swidth={92}
        {...{ IsGalleryAnimation }}
      />
      <Layout.Card src={"/catalog/9.jpg"} {...{ IsGalleryAnimation }} />
      <Layout.Card
        src={"/catalog/10.jpg"}
        swidth={60}
        {...{ IsGalleryAnimation }}
      />
    </Layout.Row>

    <Layout.Row>
      <Layout.Col>
        <Layout.Row>
          <Layout.Card
            src={"/catalog/11.jpg"}
            swidth={55}
            {...{ IsGalleryAnimation }}
          />
          <Layout.Card src={"/catalog/12.jpg"} {...{ IsGalleryAnimation }} />
        </Layout.Row>
        <Layout.Row>
          <Layout.Card src={"/catalog/14.jpg"} {...{ IsGalleryAnimation }} />
          <Layout.Card
            src={"/catalog/15.jpg"}
            swidth={68}
            {...{ IsGalleryAnimation }}
          />
        </Layout.Row>
      </Layout.Col>
      <Layout.Card
        src={"/catalog/13.jpg"}
        swidth={46}
        {...{ IsGalleryAnimation }}
      />
    </Layout.Row>
  </Layout>
);

const CommonLayout = styled.div`
  width: 100%;
  display: flex;
  perspective: 500px;
  perspective-origin: top;
  transform-style: preserve-3d;
`;

const LayoutWrapper = styled.div`
  max-width: calc(100vw - 80px);
  width: calc(100vw - 80px);
  overflow: hidden;
  position: relative;
    height: 100%;
`;

const ProjectsGallery = ({ IsGalleryAnimation }) => {
  return (
    <LayoutWrapper>
      <CommonLayout>
        <OneColumnGallery position="left" {...{ IsGalleryAnimation }} />
        <OneColumnGallery position="right" {...{ IsGalleryAnimation }} />
        <OneColumnGallery {...{ IsGalleryAnimation }} />
      </CommonLayout>
    </LayoutWrapper>
  );
};

export default ProjectsGallery;
