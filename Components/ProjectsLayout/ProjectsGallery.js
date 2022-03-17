import React from "react";

import styled from "styled-components";
import Card from "./components/gallery-card";
import { Layout } from "./components/gallery-styles";

const OneColumnGallery = ({ position, IsGalleryAnimation }) => (
  <Layout data-position={position && position}>
    <Layout.Row>
      <Card swidth={57} src={"/catalog/1.jpg"} {...{ IsGalleryAnimation }} />
      <Layout.Col>
        <Card src={"/catalog/2.jpg"} {...{ IsGalleryAnimation }} />
        <Layout.Row>
          <Card src={"/catalog/3.jpg"} {...{ IsGalleryAnimation }} />
          <Card
            src={"/catalog/4.jpg"}
            swidth={60}
            {...{ IsGalleryAnimation }}
          />
        </Layout.Row>
      </Layout.Col>
    </Layout.Row>

    <Layout.Row>
      <Card src={"/catalog/5.jpg"} swidth={60} {...{ IsGalleryAnimation }} />
      <Card src={"/catalog/6.jpg"} {...{ IsGalleryAnimation }} />
      <Card src={"/catalog/7.jpg"} swidth={90} {...{ IsGalleryAnimation }} />
    </Layout.Row>
    <Layout.Row>
      <Card src={"/catalog/8.jpg"} swidth={92} {...{ IsGalleryAnimation }} />
      <Card src={"/catalog/9.jpg"} {...{ IsGalleryAnimation }} />
      <Card src={"/catalog/10.jpg"} swidth={60} {...{ IsGalleryAnimation }} />
    </Layout.Row>

    <Layout.Row>
      <Layout.Col>
        <Layout.Row>
          <Card
            src={"/catalog/11.jpg"}
            swidth={55}
            {...{ IsGalleryAnimation }}
          />
          <Card src={"/catalog/12.jpg"} {...{ IsGalleryAnimation }} />
        </Layout.Row>
        <Layout.Row>
          <Card src={"/catalog/14.jpg"} {...{ IsGalleryAnimation }} />
          <Card
            src={"/catalog/15.jpg"}
            swidth={68}
            {...{ IsGalleryAnimation }}
          />
        </Layout.Row>
      </Layout.Col>
      <Card src={"/catalog/13.jpg"} swidth={46} {...{ IsGalleryAnimation }} />
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
