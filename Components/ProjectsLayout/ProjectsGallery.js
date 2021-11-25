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
  background-color: grey;
  width: ${({ swidth }) => (swidth ? `${swidth}%` : `100%`)};
  min-height: 25.5vw;
  background-image: url(${({ src }) => (src ? src : "")});
  background-size: cover;

  &&:hover *[data-type="card-header"] {
    cursor: pointer;
    opacity: 1;
  }
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

Layout.Card = ({ swidth, src }) => {
  return (
    <Layout.Project {...{ swidth, src }}>
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

const ProjectsGallery = () => {
  return (
    <Layout>
      <Layout.Row>
        <Layout.Card swidth={57} src={"/catalog/1.jpg"} />
        <Layout.Col>
          <Layout.Card src={"/catalog/2.jpg"} />
          <Layout.Row>
            <Layout.Card src={"/catalog/3.jpg"} />
            <Layout.Card src={"/catalog/4.jpg"} swidth={60} />
          </Layout.Row>
        </Layout.Col>
      </Layout.Row>

      <Layout.Row>
        <Layout.Card src={"/catalog/5.jpg"} swidth={60} />
        <Layout.Card src={"/catalog/6.jpg"} />
        <Layout.Card src={"/catalog/7.jpg"} swidth={90} />
      </Layout.Row>
      <Layout.Row>
        <Layout.Card src={"/catalog/8.jpg"} swidth={92} />
        <Layout.Card src={"/catalog/9.jpg"} />
        <Layout.Card src={"/catalog/10.jpg"} swidth={60} />
      </Layout.Row>

      <Layout.Row>
        <Layout.Col>
          <Layout.Row>
            <Layout.Card src={"/catalog/11.jpg"} swidth={55} />
            <Layout.Card src={"/catalog/12.jpg"} />
          </Layout.Row>
          <Layout.Row>
            <Layout.Card src={"/catalog/14.jpg"} />
            <Layout.Card src={"/catalog/15.jpg"} swidth={68} />
          </Layout.Row>
        </Layout.Col>
        <Layout.Card src={"/catalog/13.jpg"} swidth={46} />
      </Layout.Row>
    </Layout>
  );
};

export default ProjectsGallery;
