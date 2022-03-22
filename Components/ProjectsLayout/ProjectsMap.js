/* global document */
import * as React from "react";
import { useContext } from "react";
import { useState, useRef } from "react";
import ReactMapGL, { Marker } from "react-map-gl";

import styled from "styled-components";
import stc from "string-to-color";

import { MouseContext } from "../common/Cursor/mouse-context";
import { projectData } from "./data/data";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoibWFya2thYmllcnNraSIsImEiOiJja2lpa3N2c3QwaXVrMnltbHVzcXZ3dDU2In0.t_Lcd-0hPAJSk75HCJFw0g"; // Set your mapbox token here

const MapGLWrapped = styled(ReactMapGL)`
  border: 1px solid black;
`;

const CirclePoint = styled.div`
  width: 22px;
  height: 22px;
  background: black;
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.6s ease-in-out;

  border: 2.2px solid ${({ color }) => (color ? color : "black")};
  filter: brightness(1.75);

  &&:hover {
    transform: scale(1.1);
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
`;

const ProjectsMap = ({ stateData }) => {
  const { cursorType, cursorChangeHandler } = useContext(MouseContext);

  const [viewport, setViewport] = useState({
    latitude: 55.76,
    longitude: 37.612,
    zoom: 10,
    bearing: 0,
    pitch: 0,
  });

  const RectRef = useRef();

  return (
    <MapWrapper>
      <MapGLWrapped
        {...viewport}
        width="100%"
        height="46vw"
        mapStyle="mapbox://styles/markkabierski/ckwdu1l7q096k15p7se9gvol3"
        onViewportChange={setViewport}
        mapboxApiAccessToken={MAPBOX_TOKEN}
      >
        {stateData &&
          stateData.map((props = {}, i) => {
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
          })}
      </MapGLWrapped>
    </MapWrapper>
  );
};

export default ProjectsMap;
