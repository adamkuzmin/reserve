import React, { useState, useRef, useEffect, useMemo } from "react";
import styled from "styled-components";
import { useStore } from "../../Store/useStore";

import { Col, Row, Grid } from "antd";

import Navigation from "../../Components/Navigation/Navigation";
import NavRight from "../../Components/NavRight/NavRight";

import Footer from "../../Components/Footer/Footer";
import { Content } from "../../Components/common/body";

import { Text60, Text30, Text24 } from "../../Components/common/text";

import ReactMapGL, { Marker } from "react-map-gl";
import mapboxgl from "mapbox-gl";
import { CirclePoint } from "../../Components/ProjectsLayout/ProjectsMap";
import { sanity } from "@/Components/Client/sanity/sanity-client";
import { ContactsQuery } from "@/Components/Admin/queries/__queries";

const { useBreakpoint } = Grid;

export const MAPBOX_TOKEN =
  "pk.eyJ1IjoibWFya2thYmllcnNraSIsImEiOiJjbGZocWVxc2g0YnZuM3pudG1uNDllZ3c0In0.SUhq0ncJhbm76bV4IXdEnQ"; // Set your mapbox token here

mapboxgl.accessToken =
  "pk.eyJ1IjoibWFya2thYmllcnNraSIsImEiOiJjbGZocWVxc2g0YnZuM3pudG1uNDllZ3c0In0.SUhq0ncJhbm76bV4IXdEnQ";

const Gap = styled.div`
  height: ${({ sheight }) => (sheight ? sheight : "100%")};
  width: ${({ swidth }) => (swidth ? swidth : "100%")};
`;

const InfoContent = styled.div`
  margin-top: 56px;
  display: flex;
  width: 100%;
  margin-bottom: 110px;
`;

const InfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: 60px;

  margin-bottom: 48px;
`;

const MapWrapper = styled.div`
  width: 100%;
  padding-bottom: 76%;
  background-color: lightgrey;
  position: relative;
  overflow: hidden;
`;

const BlockTitle = styled.div`
  display: flex;
  flex-direction: column;

  & * {
    font-weight: 600;
  }
`;

const Contacts = () => {
  const screens = useBreakpoint();

  const blackLogo = useStore((state) => state.blackLogo);
  const setBlackLogo = useStore((state) => state.setBlackLogo);

  const contentRef = useRef();

  useEffect(() => {
    const onScroll = (e) => {
      if (contentRef && contentRef.current) {
        const BoundingRect = contentRef.current.getBoundingClientRect();

        if (BoundingRect.top <= 0 && BoundingRect.bottom >= 0 && !blackLogo) {
          setBlackLogo(true);
        }
      }
    };
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  });

  const [values, setValues] = useState();
  const [isFetched, setFetched] = useState(false);

  useEffect(() => {
    const query = ContactsQuery;

    sanity
      .fetch(query)
      .then((data) => {
        setValues(data);
        setFetched(true);
      })
      .catch(() => setFetched(true));
  }, []);

  const initialValues = useMemo(() => {
    if (!(values && isFetched)) return;

    if (values.length > 0) return values[0];
  }, [values, isFetched]);

  const [viewport, setViewport] = useState({
    latitude: 55.76,
    longitude: 37.612,
    zoom: 10,
    bearing: 0,
    pitch: 0,
  });

  if (!initialValues) return <></>;

  return (
    <div>
      <NavRight />
      <Navigation />

      <Gap sheight={`120px`} />
      <Content ref={contentRef}>
        <h3>
          <Text60 data-type="title">Контакты</Text60>
        </h3>
        <InfoContent>
          <Row gutter={[40, 40]}>
            <Col span={screens.sm ? 12 : 22}>
              <Row justify="end">
                <Col span={screens.lg ? 16 : 24}>
                  <InfoBlock>
                    <BlockTitle>
                      <Text30>{initialValues.fullname}</Text30>
                    </BlockTitle>
                    <br />
                    <Text24>
                      Фактический адрес:
                      <br /> {initialValues.actual_location} <br />
                      <br />
                      Юридический адрес:
                      <br /> {initialValues.domicile}
                    </Text24>
                  </InfoBlock>
                  <InfoBlock>
                    <BlockTitle>
                      {initialValues.phone1 && (
                        <Text30>{initialValues.phone1}</Text30>
                      )}
                      {initialValues.phone2 && (
                        <Text30>{initialValues.phone2}</Text30>
                      )}
                    </BlockTitle>
                  </InfoBlock>
                  <InfoBlock>
                    <Text24>{initialValues.comment}</Text24>
                  </InfoBlock>
                  <InfoBlock>
                    <BlockTitle style={{ paddingBottom: "0.5rem" }}>
                      <Text30>Сотрудничество и общие вопросы</Text30>
                    </BlockTitle>
                    <Text30>{initialValues.issues_email}</Text30>
                  </InfoBlock>
                  <InfoBlock>
                    <BlockTitle style={{ paddingBottom: "0.5rem" }}>
                      <Text30>Пресса</Text30>
                    </BlockTitle>
                    <Text30>{initialValues.press_email}</Text30>
                  </InfoBlock>
                  <InfoBlock>
                    <BlockTitle style={{ paddingBottom: "0.5rem" }}>
                      <Text30>Работа в «Резерве»</Text30>
                    </BlockTitle>
                    <Text24>{initialValues.hunt_description}</Text24>
                    <br />
                    <Text30>{initialValues.hunt_email}</Text30>
                  </InfoBlock>
                </Col>
              </Row>
            </Col>

            <Col span={screens.sm ? 12 : 24}>
              <MapWrapper>
                <div
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <ReactMapGL
                    style={{ position: "absolute" }}
                    {...viewport}
                    width="100%"
                    height="100%"
                    mapStyle="mapbox://styles/markkabierski/ckwdu1l7q096k15p7se9gvol3"
                    onViewportChange={setViewport}
                    mapboxApiAccessToken={
                      "pk.eyJ1IjoibWFya2thYmllcnNraSIsImEiOiJjbGZocWVxc2g0YnZuM3pudG1uNDllZ3c0In0.SUhq0ncJhbm76bV4IXdEnQ"
                    }
                  >
                    {initialValues.lng && initialValues.lat && (
                      <Marker
                        latitude={initialValues.lat}
                        longitude={initialValues.lng}
                        offsetLeft={-15}
                        offsetTop={-15}
                      >
                        <CirclePoint data-type="2" />
                      </Marker>
                    )}
                  </ReactMapGL>
                </div>
              </MapWrapper>
            </Col>
          </Row>
        </InfoContent>
      </Content>

      <Content background={"black"}>
        <Footer />
      </Content>
    </div>
  );
};

export default Contacts;
