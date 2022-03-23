/* global document */
import * as React from "react";
import { useContext } from "react";
import { useState, useRef, useMemo, useEffect } from "react";
import ReactMapGL, { Marker } from "react-map-gl";

import { Text24 } from "../common/text";

import styled from "styled-components";
import stc from "string-to-color";

import { MouseContext } from "../common/Cursor/mouse-context";
import { projectData } from "./data/data";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoibWFya2thYmllcnNraSIsImEiOiJja2lpa3N2c3QwaXVrMnltbHVzcXZ3dDU2In0.t_Lcd-0hPAJSk75HCJFw0g"; // Set your mapbox token here

const MapGLWrapped = styled(ReactMapGL)``;

const CirclePoint = styled.div`
  width: 22px;
  height: 22px;
  background: black;
  cursor: pointer;
  transition: transform 0.6s ease-in-out;

  border: 2.2px solid ${({ color }) => (color ? color : "black")};
  filter: brightness(1.75);

  &&:hover {
    transform: scale(1.1);
  }

  &&[data-type="0"] {
    border-radius: 50%;
  }

  &&[data-type="1"] {
    transform: rotate(45deg)
  }

  &&[data-type="2"] {
    border-radius: 30%;
  }
`;

const RectProject = styled.div`
  width: 300px;
  height: 400px;
  background: grey;
  positon: fixed;
  z-index: 80;
`;

const MapWrapper = styled.div`
  width: 100%;
  height: 100%;
  margin-bottom: 140px;

  border: 1px solid black;
  background-color: lightgrey;
  width: 100%;
  height: 46vw;
`;

const StatusLoader = styled.div`
  background-color: rgba(0, 0, 0, 0.8);
  position: fixed;
  left: 50%;
  transform: translateX(-50%) translateY(20px);
  padding: 10px 20px;
  border-radius: 50px;

  &&& * {
    color: white;
    font-size: 14px;
  }
`;

const ProjectsMap = ({ stateData }) => {
  const { cursorType, cursorChangeHandler } = useContext(MouseContext);

  /* загрузка карты */
  const [mapLoaded, setMapLoaded] = useState(false);
  const [pinsLoaded, setPinsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMapLoaded(true), 800);

    return () => {
      clearTimeout(timer);
    };
  });

  /* */

  const [viewport, setViewport] = useState({
    latitude: 55.76,
    longitude: 37.612,
    zoom: 10,
    bearing: 0,
    pitch: 0,
  });

  const RectRef = useRef();

  const markers = useMemo(() => {
    if (stateData)
      return stateData.map((props = {}, i) => {
        const { lat, lng, coververt, coverhor, nameru, nameen } = props;
        const {
          residential = 0,
          office = 0,
          trading = 0,
          culture = 0,
          transport = 0,
          mixed = 0,
          urban = 0,
          current = 0,
          competition = 0,
          art = 0,
        } = props;
        let color;
        if (current) color = "Действующие";
        if (competition) color = "Конкурс";
        if (residential) color = "Жилые";
        if (office) color = "Офисы";
        if (trading) color = "Торговые";
        if (culture) color = "Культурные";
        if (transport) color = "Транспорт";
        if (mixed) color = "Смешанные";
        if (urban) color = "Градо";
        if (art) color = "Арт";

        const cover = i % 2 === 0 ? coververt : coverhor;
        const coverClass = i % 2 === 0 ? "renderHor-1" : "renderVer-3";

        const metaSrc = cover ? `/projects/Frame%20${cover}.jpg` : "";

        if (lat && lat > 0 && lng && lng > 0)
          return (
            <Marker
              latitude={lat}
              longitude={lng}
              offsetLeft={-15}
              offsetTop={-15}
              key={`marker:${i}`}
            >
              <CirclePoint
                color={stc(color)}
                data-type={`${i % 4}`}
                onMouseEnter={() => {
                  return cursorChangeHandler({
                    url: metaSrc,
                    coverClass,
                    nameru,
                    nameen,
                  });
                }}
                onMouseLeave={() => cursorChangeHandler(null)}
              />
            </Marker>
          );

        return;
      });
  }, [stateData]);

  useEffect(() => {
    if (mapLoaded && markers) {
      const timer = setTimeout(() => setPinsLoaded(true), 500);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [mapLoaded, markers]);

  return (
    <MapWrapper>
      {!mapLoaded && (
        <StatusLoader>
          <Text24>Загрузка карты...</Text24>
        </StatusLoader>
      )}

      {!pinsLoaded && (
        <StatusLoader>
          <Text24>Загрузка пинов...</Text24>
        </StatusLoader>
      )}

      {mapLoaded && (
        <MapGLWrapped
          {...viewport}
          width="100%"
          height="46vw"
          mapStyle="mapbox://styles/markkabierski/ckwdu1l7q096k15p7se9gvol3"
          onViewportChange={setViewport}
          mapboxApiAccessToken={MAPBOX_TOKEN}
        >
          {markers && pinsLoaded && markers}
        </MapGLWrapped>
      )}
    </MapWrapper>
  );
};

export default ProjectsMap;
