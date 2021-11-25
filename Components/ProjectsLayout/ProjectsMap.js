/* global document */
import * as React from "react";
import { useState } from "react";
import ReactMapGL, { Marker } from "react-map-gl";

import styled from "styled-components";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoibWFya2thYmllcnNraSIsImEiOiJja2lpa3N2c3QwaXVrMnltbHVzcXZ3dDU2In0.t_Lcd-0hPAJSk75HCJFw0g"; // Set your mapbox token here

const MapGLWrapped = styled(ReactMapGL)`
  border: 1px solid black;
`;

const CirclePoint = styled.div`
  width: 30px;
  height: 30px;
  background: black;
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.6s ease-in-out;

  &&:hover {
    transform: scale(1.1);
  }
`;

const ProjectsMap = () => {
  const [viewport, setViewport] = useState({
    latitude: 55.76,
    longitude: 37.612,
    zoom: 10,
    bearing: 0,
    pitch: 0,
  });

  return (
    <MapGLWrapped
      {...viewport}
      width="100%"
      height="46vw"
      mapStyle="mapbox://styles/markkabierski/ckwdu1l7q096k15p7se9gvol3"
      onViewportChange={setViewport}
      mapboxApiAccessToken={MAPBOX_TOKEN}
    >
      <Marker
        latitude={55.685726}
        longitude={37.704754}
        offsetLeft={-15}
        offsetTop={-15}
      >
        <CirclePoint />
      </Marker>
    </MapGLWrapped>
  );
};

export default ProjectsMap;
