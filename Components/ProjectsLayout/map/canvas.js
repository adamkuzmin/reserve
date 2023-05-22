import { useRef } from "react";
import useMapCreate from "./hooks/map-create";

import styled from "styled-components";

const MapCanvas = styled.div`
  width: 100%;
  height: 100%;

  position: relative;
`;

const Canvas = ({ map, setMap, l7, setL7, children }) => {
  const mapRef = useRef(null);

  useMapCreate({
    mapPreloaded: true,
    mapRef: mapRef,
    onLoad: (map, l7) => {
      setL7(l7);
      setMap(map);
    },
  });

  return (
    <>
      <MapCanvas ref={mapRef}>{children}</MapCanvas>
    </>
  );
};

export default Canvas;
