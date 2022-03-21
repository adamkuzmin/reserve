import { Layout } from "./gallery-styles";
import Card from "./gallery-card";

const RowA = ({ IsGalleryAnimation, data = [] }) => {
  return (
    <Layout.Row>
      <Card
        swidth={57}
        {...{
          meta: data[0],
          ratio: "vertical",
        }}
      />
      <Layout.Col>
        <Card {...{ meta: data[1] }} />
        <Layout.Row>
          <Card {...{ meta: data[2] }} />
          <Card swidth={60} {...{ meta: data[3], ratio: "vertical" }} />
        </Layout.Row>
      </Layout.Col>
    </Layout.Row>
  );
};

const RowB = ({ data = [] }) => {
  return (
    <Layout.Row>
      <Card swidth={60} {...{ meta: data[0], ratio: "vertical" }} />
      <Card {...{ meta: data[1] }} />
      <Card swidth={90} {...{ meta: data[2] }} />
    </Layout.Row>
  );
};

const RowC = ({ data = [] }) => {
  return (
    <Layout.Row>
      <Card swidth={92} {...{ meta: data[0] }} />
      <Card {...{ meta: data[1] }} />
      <Card swidth={60} {...{ meta: data[2], ratio: "vertical" }} />
    </Layout.Row>
  );
};

const RowD = ({ data = [] }) => {
  return (
    <Layout.Row>
      <Layout.Col>
        <Layout.Row>
          <Card swidth={55} {...{ meta: data[0] }} />
          <Card {...{ meta: data[1] }} />
        </Layout.Row>
        <Layout.Row>
          <Card {...{ meta: data[2] }} />
          <Card swidth={68} {...{ meta: data[3] }} />
        </Layout.Row>
      </Layout.Col>
      <Card swidth={46} {...{ meta: data[4], ratio: "vertical" }} />
    </Layout.Row>
  );
};

export { RowA, RowB, RowC, RowD };
