import React, { useState, useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import { MAPBOX_TOKEN } from "../../../../ProjectsLayout/ProjectsMap";

mapboxgl.accessToken = MAPBOX_TOKEN;

const Mapbox = ({ value, onChange }) => {
  const mapContainer = useRef(null);
  const [map, setMap] = useState(null);
  const [draw, setDraw] = useState(null);
  const [marker, setMarker] = useState(null);

  useEffect(() => {
    const newMap = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: value ? value : [-74.5, 40],
      zoom: 9,
    });

    const newDraw = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        point: true,
        trash: true,
      },
    });

    newMap.addControl(newDraw);

    setMap(newMap);
    setDraw(newDraw);

    return () => {
      newMap.remove();
    };
  }, []);

  useEffect(() => {
    if (map && value) {
      const newMarker = new mapboxgl.Marker({ draggable: true })
        .setLngLat(value)
        .addTo(map);

      setMarker(newMarker);

      newMarker.on("dragend", () => {
        const [lng, lat] = newMarker.getLngLat().toArray();
        onChange([lng, lat]);
      });
    }
  }, [map, value]);

  useEffect(() => {
    if (map && draw) {
      map.on("draw.create", (event) => {
        const { features } = event;
        const [lng, lat] = features[0].geometry.coordinates;
        const newMarker = new mapboxgl.Marker({ draggable: true })
          .setLngLat([lng, lat])
          .addTo(map);

        setMarker(newMarker);

        newMarker.on("dragend", () => {
          const [lng, lat] = newMarker.getLngLat().toArray();
          onChange([lng, lat]);
        });

        draw.deleteAll();
      });

      map.on("draw.delete", () => {
        if (marker) {
          marker.remove();
          setMarker(null);
          onChange(null);
        }
      });
    }
  }, [map, draw, marker, onChange]);

  return <div ref={mapContainer} style={{ width: "100%", height: 350 }} />;
};

export default Mapbox;
