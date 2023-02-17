import React, { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Line } from "@react-three/drei";
import { extend, Canvas, useFrame, useThree } from "@react-three/fiber";

const MeshGeometry = ({ ...props }) => {
  const Reff = useRef();

  const [xdelta, setXdelta] = useState(0);
  const [x1delta, setX1delta] = useState(0);

  const points = [
    0.9,
    0,
    -1,
    1,
    0,
    1,
    -1,
    0,
    1,
    -1,
    0,
    -1, //end of base
    0.9,
    0,
    -1,
    -1,
    2,
    0.5, //top vertcie,
    -1,
    0,
    1,
    -1,
    2,
    0.5,
    1,
    0,
    1,
    -1,
    2,
    0.5,
    -1,
    0,
    -1,
    1,
    1,
    0.5,
    1,
    0,
    1,
    1,
    1,
    0.5,
    0.9,
    0,
    -1,
    1,
    1,
    0.5,
    -1,
    2,
    0.5,
  ];

  const pointArrays = [];
  for (let i = 0; i < points.length; i += 3) {
    pointArrays.push([points[i], points[i + 1], points[i + 2]]);
  }

  useFrame((state, delta) => {
    const { geometry } = Reff.current;
    const { position } = geometry.attributes;

    setXdelta(xdelta + 0.012);

    const xcos = 0.2 * Math.cos(xdelta);
    const xsin = 0.2 * Math.sin(xdelta);
    position.array[31] = 2 + xcos;
    position.array[32] = 0.5 + xsin;
    position.array[34] = 2 + xcos;
    position.array[35] = 0.5 + xsin;
    position.array[43] = 2 + xcos;
    position.array[44] = 0.5 + xsin;
    position.array[46] = 2 + xcos;
    position.array[47] = 0.5 + xsin;
    position.array[55] = 2 + xcos;
    position.array[56] = 0.5 + xsin;
    position.array[58] = 2 + xcos;
    position.array[59] = 0.5 + xsin;
    position.array[97] = 2 + xcos;
    position.array[98] = 0.5 + xsin;
    position.array[100] = 2 + xcos;
    position.array[101] = 0.5 + xsin;

    setX1delta(x1delta + 0.007);
    const x1cos = -0.7 * Math.cos(x1delta);
    const x1sin = -2 * Math.sin(x1delta);
    position.array[0] = 0.9 + x1cos;
    position.array[2] = -1 + x1sin;
    position.array[3] = 0.9 + x1cos;
    position.array[5] = -1 + x1sin;
    position.array[24] = 0.9 + x1cos;
    position.array[26] = -1 + x1sin;
    position.array[27] = 0.9 + x1cos;
    position.array[29] = -1 + x1sin;
    position.array[84] = 0.9 + x1cos;
    position.array[86] = -1 + x1sin;
    position.array[87] = 0.9 + x1cos;
    position.array[89] = -1 + x1sin;

    position.needsUpdate = true;
    geometry.computeVertexNormals();

    Reff.current.rotation.y += 0.0008;
  });

  return (
    <group>
      <Line
        points={pointArrays}
        ref={Reff}
        position={[0, -0.4, 2]}
        rotation={[
          (28 * Math.PI) / 180,
          (-25 * Math.PI) / 180,
          (-4 * Math.PI) / 180,
        ]}
        lineWidth={0.4}
        color={"black"}
        linecap={"round"}
      ></Line>
    </group>
  );
};

export default MeshGeometry;
