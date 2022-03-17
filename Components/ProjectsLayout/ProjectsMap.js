/* global document */
import * as React from "react";
import { useContext } from "react";
import { useState, useRef } from "react";
import ReactMapGL, { Marker } from "react-map-gl";

import styled from "styled-components";

import { MouseContext } from "../common/Cursor/mouse-context";
import { projectData } from "./data/data";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoibWFya2thYmllcnNraSIsImEiOiJja2lpa3N2c3QwaXVrMnltbHVzcXZ3dDU2In0.t_Lcd-0hPAJSk75HCJFw0g"; // Set your mapbox token here

const MapGLWrapped = styled(ReactMapGL)`
  border: 1px solid black;
`;

const CirclePoint = styled.div`
  width: 24px;
  height: 24px;
  background: black;
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.6s ease-in-out;

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

const ProjectsMap = () => {
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
        {projectData &&
          projectData.map((props = {}, i) => {
            const { lat, lng } = props;

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
                    onMouseEnter={() =>
                      cursorChangeHandler("renderHor-" + ((i + 1) % 4))
                    }
                    onMouseLeave={() => cursorChangeHandler("")}
                  />
                </Marker>
              );

            return;
          })}

        {/*<Marker
          latitude={55.685726}
          longitude={37.704754}
          offsetLeft={-15}
          offsetTop={-15}
        >
          <CirclePoint
            onMouseEnter={() => cursorChangeHandler("renderHor-1")}
            onMouseLeave={() => cursorChangeHandler("")}
          />
        </Marker>
        <Marker
          latitude={55.732365}
          longitude={37.609544}
          offsetLeft={-15}
          offsetTop={-15}
        >
          <CirclePoint
            onMouseEnter={() => cursorChangeHandler("renderHor-1")}
            onMouseLeave={() => cursorChangeHandler("")}
          />
        </Marker>
        <Marker
          latitude={55.842874}
          longitude={37.822597}
          offsetLeft={-15}
          offsetTop={-15}
        >
          <CirclePoint
            onMouseEnter={() => cursorChangeHandler("renderHor-1")}
            onMouseLeave={() => cursorChangeHandler("")}
          />
        </Marker>
        <Marker
          latitude={55.798278}
          longitude={37.570485}
          offsetLeft={-15}
          offsetTop={-15}
        >
          <CirclePoint
            onMouseEnter={() => cursorChangeHandler("renderHor-2")}
            onMouseLeave={() => cursorChangeHandler("")}
          />
        </Marker>
        <Marker
          latitude={55.826748}
          longitude={37.345837}
          offsetLeft={-15}
          offsetTop={-15}
        >
          <CirclePoint
            onMouseEnter={() => cursorChangeHandler("renderHor-2")}
            onMouseLeave={() => cursorChangeHandler("")}
          />
        </Marker>
        <Marker
          latitude={55.670443}
          longitude={37.526568}
          offsetLeft={-15}
          offsetTop={-15}
        >
          <CirclePoint
            onMouseEnter={() => cursorChangeHandler("renderHor-2")}
            onMouseLeave={() => cursorChangeHandler("")}
          />
        </Marker>
        <Marker
          latitude={55.739392}
          longitude={37.656063}
          offsetLeft={-15}
          offsetTop={-15}
        >
          <CirclePoint
            onMouseEnter={() => cursorChangeHandler("renderHor-2")}
            onMouseLeave={() => cursorChangeHandler("")}
          />
        </Marker>
        <Marker
          latitude={55.794765}
          longitude={37.365433}
          offsetLeft={-15}
          offsetTop={-15}
        >
          <CirclePoint
            onMouseEnter={() => cursorChangeHandler("renderHor-2")}
            onMouseLeave={() => cursorChangeHandler("")}
          />
        </Marker>
        <Marker
          latitude={55.790595}
          longitude={37.679288}
          offsetLeft={-15}
          offsetTop={-15}
        >
          <CirclePoint
            onMouseEnter={() => cursorChangeHandler("renderVer-3")}
            onMouseLeave={() => cursorChangeHandler("")}
          />
        </Marker>
        <Marker
          latitude={55.752324}
          longitude={37.675067}
          offsetLeft={-15}
          offsetTop={-15}
        >
          <CirclePoint
            onMouseEnter={() => cursorChangeHandler("renderVer-3")}
            onMouseLeave={() => cursorChangeHandler("")}
          />
        </Marker>
        <Marker
          latitude={55.713094}
          longitude={37.49795}
          offsetLeft={-15}
          offsetTop={-15}
        >
          <CirclePoint
            onMouseEnter={() => cursorChangeHandler("renderVer-4")}
            onMouseLeave={() => cursorChangeHandler("")}
          />
        </Marker>
        <Marker
          latitude={55.738913}
          longitude={37.544588}
          offsetLeft={-15}
          offsetTop={-15}
        >
          <CirclePoint
            onMouseEnter={() => cursorChangeHandler("renderVer-4")}
            onMouseLeave={() => cursorChangeHandler("")}
          />
        </Marker>
        <Marker
          latitude={55.832831}
          longitude={37.474586}
          offsetLeft={-15}
          offsetTop={-15}
        >
          <CirclePoint
            onMouseEnter={() => cursorChangeHandler("renderVer-4")}
            onMouseLeave={() => cursorChangeHandler("")}
          />
        </Marker>*/}
      </MapGLWrapped>
    </MapWrapper>
  );
};

export default ProjectsMap;
