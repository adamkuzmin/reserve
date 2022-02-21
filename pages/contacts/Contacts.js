import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useStore } from "../../Store/useStore";

import { Col } from "antd";

import Navigation from "../../Components/Navigation/Navigation";
import NavRight from "../../Components/NavRight/NavRight";

import Footer from "../../Components/Footer/Footer";
import { Content } from "../../Components/common/body";

import { Text60, Text30, Text24 } from "../../Components/common/text";

import ReactMapGL, { Marker } from "react-map-gl";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoibWFya2thYmllcnNraSIsImEiOiJja2lpa3N2c3QwaXVrMnltbHVzcXZ3dDU2In0.t_Lcd-0hPAJSk75HCJFw0g"; // Set your mapbox token here

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
  width: 46vw;
  height: 35vw;
  background-color: lightgrey;
`;

const BlockTitle = styled.div`
  display: flex;
  flex-direction: column;

  & * {
    font-weight: 600;
  }
`;

const Contacts = () => {
  const [viewport, setViewport] = useState({
    latitude: 55.76,
    longitude: 37.612,
    zoom: 10,
    bearing: 0,
    pitch: 0,
  });

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
          <Col>
            <Gap swidth={`11.1vw`} />
          </Col>
          <Col>
            <InfoBlock>
              <BlockTitle>
                <Text30>ООО «ТПО “Резерв”»</Text30>
              </BlockTitle>
              <Text24>
                Фактический адрес:
                <br /> Ленинградский проспект, 31А стр. 1, Москва, 125284,
                Россия <br />
                Юридический адрес:
                <br /> Ул. Грузинская Б. дом 20, офис 4, Москва, 123242, Россия
              </Text24>
            </InfoBlock>
            <InfoBlock>
              <BlockTitle>
                <Text30>+7 495 755 69 60</Text30>
                <Text30>+7 495 280 75 25</Text30>
              </BlockTitle>
            </InfoBlock>
            <InfoBlock>
              <Text24>
                Сообщите о своем визите заранее, чтобы мы заказали для вас
                пропуск.
              </Text24>
            </InfoBlock>
            <InfoBlock>
              <BlockTitle>
                <Text30>Сотрудничество и общие вопросы</Text30>
              </BlockTitle>
              <Text30>info@reserve.ru</Text30>
            </InfoBlock>
            <InfoBlock>
              <BlockTitle>
                <Text30>Пресса</Text30>
              </BlockTitle>
              <Text30>press@reserve.ru</Text30>
            </InfoBlock>
            <InfoBlock>
              <BlockTitle>
                <Text30>Работа в «Резерве»</Text30>
              </BlockTitle>
              <Text24>
                Мы всегда заинтересованы в талантах! Присылайте ваше портфолио и
                резюме. Размер прикрепленных к письму файлов не должны превышать
                10 мб.
              </Text24>
              <Text30>ok@reserve.ru</Text30>
            </InfoBlock>
          </Col>
          <Col>
            <MapWrapper>
              <ReactMapGL
                {...viewport}
                width="100%"
                height="100%"
                mapStyle="mapbox://styles/markkabierski/ckwdu1l7q096k15p7se9gvol3"
                onViewportChange={setViewport}
                mapboxApiAccessToken={MAPBOX_TOKEN}
              ></ReactMapGL>
            </MapWrapper>
          </Col>
        </InfoContent>
      </Content>

      <Content background={"black"}>
        <Footer />
      </Content>
    </div>
  );
};

export default Contacts;
