import React, { useContext } from "react";
import useMousePosition from "./useMousePosition";
import { MouseContext } from "./mouse-context";

import { Typography } from "antd";
const { Paragraph } = Typography;

const DotRing = () => {
  // 1.
  const { cursorType, cursorChangeHandler } = useContext(MouseContext);

  const { x, y } = useMousePosition();

  const conditionOfShow = cursorType && typeof cursorType === "object";

  let imgUrl, imgClass, imgName;
  if (conditionOfShow) {
    const { url, coverClass, nameru } = cursorType;
    imgUrl = url;
    imgClass = coverClass;
    imgName = nameru;
  }

  const backgroundConfigs = conditionOfShow
    ? {
        backgroundImage: `url("${imgUrl}")`,
        backgroundSize: "cover",
      }
    : null;

  const ring_className = !conditionOfShow ? "ring" : `ring ` + imgClass;
  const dot_className = !conditionOfShow ? "dot" : "dot " + imgClass;

  return (
    <>
      {/* 2. */}
      <div
        style={{ left: `${x}px`, top: `${y}px`, ...backgroundConfigs }}
        className={ring_className}
      >
        {imgName && (
          <div className="ringLabel">
            <Paragraph ellipsis={{ rows: 2 }}>{imgName}</Paragraph>
          </div>
        )}
      </div>
      <div
        className={dot_className}
        style={{ left: `${x}px`, top: `${y}px` }}
      ></div>
    </>
  );
};

export default DotRing;
