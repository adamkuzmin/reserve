import { Layout } from "./gallery-styles";
import Card from "./gallery-card";

const OneColumnGallery = ({ position }) => (
  <Layout data-position={position && position}>
    <Layout.Row>
      <Card swidth={57} src={"/projects/Frame%20217.jpg"} />
      <Layout.Col>
        <Card src={"/catalog/2.jpg"} />
        <Layout.Row>
          <Card src={"/catalog/3.jpg"} />
          <Card src={"/catalog/4.jpg"} swidth={60} />
        </Layout.Row>
      </Layout.Col>
    </Layout.Row>

    <Layout.Row>
      <Card src={"/catalog/5.jpg"} swidth={60} />
      <Card src={"/catalog/6.jpg"} />
      <Card src={"/catalog/7.jpg"} swidth={90} />
    </Layout.Row>
    <Layout.Row>
      <Card src={"/catalog/8.jpg"} swidth={92} />
      <Card src={"/catalog/9.jpg"} />
      <Card src={"/catalog/10.jpg"} swidth={60} />
    </Layout.Row>

    <Layout.Row>
      <Layout.Col>
        <Layout.Row>
          <Card src={"/catalog/11.jpg"} swidth={55} />
          <Card src={"/catalog/12.jpg"} />
        </Layout.Row>
        <Layout.Row>
          <Card src={"/catalog/14.jpg"} />
          <Card src={"/catalog/15.jpg"} swidth={68} />
        </Layout.Row>
      </Layout.Col>
      <Card src={"/catalog/13.jpg"} swidth={46} />
    </Layout.Row>
  </Layout>
);

export default OneColumnGallery;
