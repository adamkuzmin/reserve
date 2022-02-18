import { useEffect, useState } from "react";

export default function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({ x: null, y: null });

  useEffect(() => {
    const mouseMoveHandler = (event) => {
      const { clientX, clientY } = event;
      setMousePosition({ x: clientX, y: clientY });
    };
    document
      .getElementById("__next")
      .addEventListener("mousemove", mouseMoveHandler);

    return () => {
      document
        .getElementById("__next")
        .removeEventListener("mousemove", mouseMoveHandler);
    };
  }, []);

  return mousePosition;
}
