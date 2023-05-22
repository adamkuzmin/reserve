import { Scene, PointLayer } from "@antv/l7";
import { Mapbox } from "@antv/l7-maps";
import { DrawEvent, DrawModes, DrawPoint, Draw } from "@antv/l7-draw";
import { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import { marker } from "leaflet";

const accessToken =
  "pk.eyJ1IjoidGh4ZW5hIiwiYSI6ImNrY2x2bzJnNjI4ODYycm84dXczcjFjczIifQ.pSsJcytxy7HzXOrWUzzFUg";
const style = "mapbox://styles/thxena/cleinolhr001501pndjc9d7hg";

const DraggablePin = ({ marker, map, updateMarker }) => {
  useEffect(() => {
    if (!(map && marker)) return;

    const _marker = new mapboxgl.Marker({
      draggable: true,
    })
      .setLngLat([marker.lng, marker.lat]) // Set the initial position of the marker
      .addTo(map);

    // Listen for the 'dragend' event when the marker is dragged
    _marker.on("dragend", () => {
      const { lng, lat } = _marker._lngLat;

      updateMarker(lng, lat);
    });

    return () => {
      _marker.remove();
    };
  }, [map, marker]);

  return <></>;
};

export default DraggablePin;
