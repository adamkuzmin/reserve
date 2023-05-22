import React, { useEffect, useState } from "react";
import Canvas from "@/Components/ProjectsLayout/map/canvas";
import SearchAddress from "./address/search-address";
import DraggablePin from "./address/draggable-pin";
import mapboxgl from "mapbox-gl";
import { MAPBOX_TOKEN } from "@/Components/ProjectsLayout/ProjectsMap";

const accessToken =
  "pk.eyJ1IjoibWFya2thYmllcnNraSIsImEiOiJjbGZocWVxc2g0YnZuM3pudG1uNDllZ3c0In0.SUhq0ncJhbm76bV4IXdEnQ";

const Address = ({ form }) => {
  const initialLat = form.getFieldValue("lat");
  const initialLng = form.getFieldValue("lng");
  const [marker, setMarker] = useState(
    initialLat && initialLng ? { lat: initialLat, lng: initialLng } : null
  );

  const [map, setMap] = useState(null);

  const updateMarker = (lng, lat) => {
    form.setFieldsValue({
      lat,
      lng,
    });

    setMarker({ lng, lat });
  };

  useEffect(() => {
    const initialLat = form.getFieldValue("lat");
    const initialLng = form.getFieldValue("lng");

    let center = [37.618423, 55.751244];
    let zoom = 12;
    if (initialLat && initialLng) {
      center = [initialLng, initialLat];
      zoom = 14;
    }

    const map = new mapboxgl.Map({
      container: "map",
      accessToken,
      style: "mapbox://styles/markkabierski/ckwdu1l7q096k15p7se9gvol3",
      center,
      zoom,
    });

    map.on("load", () => {
      setMap(map);
    });

    map.on("click", (e) => {
      const { lng, lat } = e.lngLat;
      updateMarker(lng, lat);
    });

    return () => {
      map.remove();
    };
  }, [form]);

  return (
    <div style={{ width: "100%", height: "400px" }}>
      <SearchAddress {...{ map, updateMarker }} />

      <DraggablePin
        {...{
          marker,
          updateMarker,
          map,
        }}
      />

      <div id="map" style={{ width: "100%", height: "100%" }}></div>
    </div>
  );
};

export default Address;
