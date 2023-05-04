import React, { useState, useCallback, useRef } from "react";
import ReactMapGL, { Marker, NavigationControl } from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";
import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { Form, Input } from "antd";
import { MAPBOX_TOKEN } from "@/Components/ProjectsLayout/ProjectsMap";

const Address = ({ onPinDrop }) => {
  const [viewport, setViewport] = useState({
    latitude: 50.5,
    longitude: 30.5,
    zoom: 9,
  });

  const [marker, setMarker] = useState(null);
  const mapRef = useRef();

  const handleClick = (event) => {
    const [longitude, latitude] = event.lngLat;
    setMarker({ latitude, longitude });
    onPinDrop({ latitude, longitude });
  };

  const handleViewportChange = useCallback(
    (newViewport) => setViewport(newViewport),
    []
  );

  return (
    <ReactMapGL
      ref={mapRef}
      {...viewport}
      width="100%"
      height="400px"
      mapStyle="mapbox://styles/markkabierski/ckwdu1l7q096k15p7se9gvol3"
      mapboxApiAccessToken={MAPBOX_TOKEN}
      onViewportChange={handleViewportChange}
      onClick={handleClick}
    >
      <Geocoder
        mapRef={mapRef}
        onViewportChange={handleViewportChange}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        position="top-left"
      />
      <NavigationControl showCompass={false} />
      {marker && (
        <Marker
          latitude={marker.latitude}
          longitude={marker.longitude}
          offsetLeft={-10}
          offsetTop={-20}
        >
          <div style={{ color: "red", fontSize: "24px" }}>📍</div>
        </Marker>
      )}
    </ReactMapGL>
  );
};

export default Address;
