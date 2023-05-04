import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import { GeoSearchControl } from "leaflet-geosearch";

const SearchControl = () => {
  const map = useMap();

  useEffect(() => {
    const provider = new OpenStreetMapProvider();
    const searchControl = new GeoSearchControl({
      provider: provider,
      autoComplete: true,
      autoCompleteDelay: 250,
      showMarker: false,
      retainZoomLevel: true,
    });

    map.addControl(searchControl);

    return () => {
      map.removeControl(searchControl);
    };
  }, [map]);

  return null;
};

const Address = ({ onPinDrop }) => {
  const [marker, setMarker] = useState(null);

  const MapEvents = () => {
    const map = useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        setMarker({ latitude: lat, longitude: lng });
        onPinDrop({ latitude: lat, longitude: lng });
      },
    });

    return null;
  };

  return (
    <MapContainer
      center={[55.7558, 37.6173]}
      zoom={9}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      />

      <MapEvents />
      <SearchControl />

      {marker && (
        <Marker
          position={[marker.latitude, marker.longitude]}
          icon={L.divIcon({ className: "custom-marker" })}
        >
          <Popup>Custom Marker</Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default Address;
