import { useEffect } from "react";

const center = [37.618423, 55.751244];
const zoom = 10;

const accessToken =
  "pk.eyJ1IjoidGh4ZW5hIiwiYSI6ImNrY2x2bzJnNjI4ODYycm84dXczcjFjczIifQ.pSsJcytxy7HzXOrWUzzFUg";
const style = "mapbox://styles/thxena/cleinolhr001501pndjc9d7hg";

const useMapCreate = ({ mapPreloaded, mapRef, onLoad }) => {
  useEffect(() => {
    if (!(mapPreloaded && mapRef.current)) return;

    const init = async () => {
      {
        /* Шаг 1: Основные настройки карты */
      }
      const { Scene } = await import("@antv/l7");
      const { Mapbox } = await import("@antv/l7-maps");

      const scene = new Scene({
        id: mapRef.current,
        map: new Mapbox({
          minZoom: 3,
          style,
          zoom,
          center,
          pitch: 0,
          antialias: true,
          token: accessToken,
          attributionControl: true,
        }),
      });

      if (scene) {
        {
          /* Шаг 2: Настройка контента карты */
        }
        scene.map?.on("load", () => {
          console.log("1. L7 Scene, Mapbox GL are ready");
          onLoad(scene.map, scene);
        });
      }
    };

    init()
      .then((res) => {})
      .catch((e) => {});
  }, [mapPreloaded, mapRef]);
};

export default useMapCreate;
