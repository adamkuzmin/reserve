/* global document */
import * as React from "react";
import { useContext } from "react";
import { useState, useRef, useMemo, useEffect } from "react";
import { Grid } from "antd";
import { useRouter } from "next/router";

import { Text24 } from "../common/text";

import styled from "styled-components";
import stc from "string-to-color";

import { MouseContext } from "../common/Cursor/mouse-context";
import { projectData } from "./data/data";
import mapboxgl from "mapbox-gl";
const { useBreakpoint } = Grid;

export const MAPBOX_TOKEN =
  "pk.eyJ1IjoibWFya2thYmllcnNraSIsImEiOiJja2lpa3N2c3QwaXVrMnltbHVzcXZ3dDU2In0.t_Lcd-0hPAJSk75HCJFw0g"; // Set your mapbox token here

export const CirclePoint = styled.div`
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
    transform: rotate(45deg);
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

  @media (max-width: 576px) {
    &&& {
      width: 100vw;
      height: 100vh;
      margin-left: -20px;
    }
  }

  && .mapboxgl-canvas-container {
    position: relative;
    height: 100%;
  }

  && .marker {
    border: 1px solid rgba(0, 0, 0, 0.5) !important;

    &[data-type="0"] {
      border-radius: 50%;
    }

    &[data-type="1"] {
      transform: rotate(45deg);
    }

    &[data-type="2"] {
      border-radius: 30%;
    }
  }
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
  const mapContainerRef = useRef(null);
  const [map, setMap] = useState(null);
  const markersRef = useRef([]);
  //const [markers, setMarkers] = useState(null);
  const { cursorChangeHandler } = useContext(MouseContext);
  const router = useRouter();

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "map",
      accessToken:
        "pk.eyJ1IjoibWFya2thYmllcnNraSIsImEiOiJjbGZocWVxc2g0YnZuM3pudG1uNDllZ3c0In0.SUhq0ncJhbm76bV4IXdEnQ",
      style: "mapbox://styles/markkabierski/ckwdu1l7q096k15p7se9gvol3",
      center: [37.612, 55.76],
      zoom: 10,
    });

    map.on("load", () => {
      setMap(map);
      setMapLoaded(true);
      map.resize();
    });

    return () => map.remove();
  }, []);

  const screens = useBreakpoint();

  /* загрузка карты */
  const [mapLoaded, setMapLoaded] = useState(false);
  const [pinsLoaded, setPinsLoaded] = useState(false);

  useEffect(() => {
    if (stateData && mapLoaded && pinsLoaded && map) {
      let _stateData = [...stateData].filter(({ lng, lat }) => lng && lat);

      // Remove old markers
      markersRef.current.forEach((marker) => marker.remove());

      // Reset markers array
      markersRef.current = [];

      console.log("_stateData", _stateData);

      _stateData.forEach(({ lng, lat, ...other }, i) => {
        const { coververt, coverhor, nameru, nameen, id, cats = [] } = other;

        const [category] = cats.length > 0 ? cats : ["Uknown"];

        const coverClass = i % 2 === 0 ? "renderHor-1" : "renderVer-3";

        const cover = i % 2 === 0 ? coververt : coverhor;
        const metaSrc = cover ? cover : "";

        const markerElement = document.createElement("div");
        markerElement.className = "marker";
        markerElement.style.background = stc(category);
        markerElement.style.width = "22px";
        markerElement.style.height = "22px";
        markerElement.style.border = `2.2px solid ${
          stc(category) ? stc(category) : "black"
        }`;
        markerElement.style.filter = "brightness(1.35)";
        markerElement.setAttribute("data-type", `${i % 4}`);

        markerElement.addEventListener("click", () => {
          cursorChangeHandler(null);
          router.push(`/project/${id}`);
        });
        markerElement.addEventListener("mouseenter", () => {
          cursorChangeHandler({
            url: metaSrc,
            coverClass,
            nameru,
            nameen,
          });
        });
        markerElement.addEventListener("mouseleave", () => {
          cursorChangeHandler(null);
        });

        const marker = new mapboxgl.Marker({
          element: markerElement,
          anchor: "center",
        })
          .setLngLat([lng, lat])
          .addTo(map);

        // Store marker reference so we can remove it later
        markersRef.current.push(marker);
      });
    }
  }, [stateData, mapLoaded, map, pinsLoaded]);

  /* const markers = useMemo(() => {
    if (stateData) {
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

        const router = useRouter();

        if (lat && lat > 0 && lng && lng > 0) {
          const markerElement = document.createElement("div");
          markerElement.className = "marker";
          markerElement.style.background = stc(color);
          markerElement.style.width = "22px";
          markerElement.style.height = "22px";
          markerElement.style.border = `2.2px solid ${color ? color : "black"}`;
          markerElement.style.filter = "brightness(1.75)";
          markerElement.setAttribute("data-type", `${i % 4}`);
          markerElement.addEventListener("click", () => {
            cursorChangeHandler(null);
            router.push("/project");
          });
          markerElement.addEventListener("mouseenter", () => {
            cursorChangeHandler({
              url: metaSrc,
              coverClass,
              nameru,
              nameen,
            });
          });
          markerElement.addEventListener("mouseleave", () => {
            cursorChangeHandler(null);
          });

          return new mapboxgl.Marker({
            element: markerElement,
            anchor: "center",
          })
            .setLngLat([lng, lat])
            .addTo(map);
        }

        return null;
      });
    }
  }, [stateData]); */

  useEffect(() => {
    if (mapLoaded && stateData) {
      const timer = setTimeout(() => setPinsLoaded(true), 500);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [mapLoaded, stateData]);

  return (
    <MapWrapper style={{ position: "relative" }}>
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

      <div
        ref={mapContainerRef}
        id="map"
        style={{
          width: "100%",
          height: screens.sm ? "46vw" : "100%",
          position: "relative",
        }}
      ></div>
    </MapWrapper>
  );
};

export default ProjectsMap;
