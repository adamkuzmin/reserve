import styled from "styled-components";
import Link from "next/link";

import {
  Text254,
  Text96,
  Text60,
  Text48,
  Text40,
  Text36,
  Text30,
  Text24,
  Wrap24,
} from "../common/text";

const Layout = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 10vw;

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

  && > * + * {
    margin-left: 4px;
  }
`;

Layout.Col = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

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

  &&:hover *[data-type="card-header"] {
    cursor: pointer;
    opacity: 1;
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
  opacity: 0;
  transform: translateY(100%);

  animation: ImageRender 1s ease-out
    calc(
      1s + 0.03 * ${({ initialkey }) => (initialkey ? `${initialkey}s` : `0s`)}
    );
  @keyframes ImageRender {
    0% {
      opacity: 0;
      transform: translateY(100%);
    }

    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  -webkit-animation-fill-mode: forwards;
  -moz-animation-fill-mode: forwards;
  -ms-animation-fill-mode: forwards;
  -o-animation-fill-mode: forwards;
  animation-fill-mode: forwards;
`;

const Header = styled.div`
  width: 100%;
  height: 100%;
  background: white;
  position: relative;
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

Layout.Card = ({ swidth, src, initialkey }) => {
  return (
    <Layout.Project
      {...{ swidth, src }}
      onClick={() => (location.href = "/project")}
    >
      <Render {...{ src, initialkey }} />
      <Header data-type="card-header">
        <Header.Title>
          <p>
            <Text30 data-font="wremena">Объект культуры</Text30>
          </p>
          <h3>
            <Text48 data-type="title">Концертный зал «Зарядье»</Text48>
          </h3>
        </Header.Title>
        <Header.Year>
          <Text30 data-font="wremena">2018</Text30>
        </Header.Year>
      </Header>
    </Layout.Project>
  );
};

const OneColumnGallery = ({ position, initialkey }) => (
  <Layout data-position={position && position}>
    <Layout.Row>
      <Layout.Card
        swidth={57}
        src={"/catalog/1.jpg"}
        initialkey={initialkey + 0}
      />
      <Layout.Col>
        <Layout.Card src={"/catalog/2.jpg"} initialkey={initialkey + 1} />
        <Layout.Row>
          <Layout.Card src={"/catalog/3.jpg"} initialkey={initialkey + 2} />
          <Layout.Card
            src={"/catalog/4.jpg"}
            initialkey={initialkey + 3}
            swidth={60}
          />
        </Layout.Row>
      </Layout.Col>
    </Layout.Row>

    <Layout.Row>
      <Layout.Card
        src={"/catalog/5.jpg"}
        swidth={60}
        initialkey={initialkey + 3}
      />
      <Layout.Card src={"/catalog/6.jpg"} initialkey={initialkey + 4} />
      <Layout.Card
        src={"/catalog/7.jpg"}
        swidth={90}
        initialkey={initialkey + 5}
      />
    </Layout.Row>
    <Layout.Row>
      <Layout.Card
        src={"/catalog/8.jpg"}
        swidth={92}
        initialkey={initialkey + 6}
      />
      <Layout.Card src={"/catalog/9.jpg"} initialkey={initialkey + 7} />
      <Layout.Card
        src={"/catalog/10.jpg"}
        swidth={60}
        initialkey={initialkey + 8}
      />
    </Layout.Row>

    <Layout.Row>
      <Layout.Col>
        <Layout.Row>
          <Layout.Card
            src={"/catalog/11.jpg"}
            swidth={55}
            initialkey={initialkey + 9}
          />
          <Layout.Card src={"/catalog/12.jpg"} initialkey={initialkey + 10} />
        </Layout.Row>
        <Layout.Row>
          <Layout.Card src={"/catalog/14.jpg"} initialkey={initialkey + 11} />
          <Layout.Card
            src={"/catalog/15.jpg"}
            swidth={68}
            initialkey={initialkey + 12}
          />
        </Layout.Row>
      </Layout.Col>
      <Layout.Card
        src={"/catalog/13.jpg"}
        swidth={46}
        initialkey={initialkey + 13}
      />
    </Layout.Row>
  </Layout>
);

const CommonLayout = styled.div`
  width: 100%;
  transform: scale(0.4, 0.4) translateY(-74%);

  animation: CommonLayout 4s ease-out 2s;
  @keyframes CommonLayout {
    0% {
      transform: scale(0.4, 0.4) translateY(-74%);
    }

    50% {
      transform: scale(0.4, 0.4) translateY(-74%);
    }

    100% {
      transform: scale(1, 1) translateY(0%);
    }
  }

  -webkit-animation-fill-mode: forwards;
  -moz-animation-fill-mode: forwards;
  -ms-animation-fill-mode: forwards;
  -o-animation-fill-mode: forwards;
  animation-fill-mode: forwards;
`;

const ProjectsGallery = () => {
  return (
    <CommonLayout>
      <OneColumnGallery position="left" initialkey={0} />
      <OneColumnGallery position="right" initialkey={30} />
      <OneColumnGallery initialkey={15} />
    </CommonLayout>
  );
};

export default ProjectsGallery;
