import React, { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { MeshLine, MeshLineMaterial } from "meshline";
import { extend, Canvas, useFrame, useThree } from "@react-three/fiber";

extend({ MeshLine, MeshLineMaterial });

import styled from "styled-components";

const MeshGeometry = ({ ...props }) => {
  const [xdelta, setXdelta] = useState(0)
  const [x1delta, setX1delta] = useState(0)

  const points = [
    .9, 0, -1,
    1, 0, 1,
    -1, 0, 1,
    -1, 0, -1, //end of base
    .9, 0, -1,
    -1, 2, 0.5, //top vertcie,
    -1, 0, 1,
    -1, 2, 0.5,
    1, 0, 1,
    -1, 2, 0.5,
    -1, 0, -1,
    1, 1, 0.5,
    1, 0, 1,
    1, 1, 0.5,
    .9, 0, -1,
    1, 1, 0.5,
    -1, 2, 0.5,
  ];
  /*for (let j = 0; j < Math.PI; j += (2 * Math.PI) / 100) {
    points.push(Math.cos(j), Math.sin(j), 0);
  }
  */

  const Reff = useRef();

  useFrame((state, delta) => {
    const { geometry } = Reff.current;
    const { position } = geometry.attributes;


    setXdelta(xdelta + .012)

    const xcos = 0.2 * Math.cos(xdelta)
    const xsin = 0.2 * Math.sin(xdelta)
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
    
    setX1delta(x1delta + .007)
    const x1cos = -.7 * Math.cos(x1delta)
    const x1sin = -2 * Math.sin(x1delta)
    position.array[0] = .9 + x1cos;
    position.array[2] = -1 + x1sin;
    position.array[3] = .9 + x1cos;
    position.array[5] = -1 + x1sin;
    position.array[24] = .9 + x1cos;
    position.array[26] = -1 + x1sin;
    position.array[27] = .9 + x1cos;
    position.array[29] = -1 + x1sin;
    position.array[84] = .9 + x1cos;
    position.array[86] = -1 + x1sin;
    position.array[87] = .9 + x1cos;
    position.array[89] = -1 + x1sin;
    

    position.needsUpdate = true;
    geometry.computeVertexNormals();

    Reff.current.rotation.y += 0.0008;
  });

  return (
    <mesh
      ref={Reff}
      position={[0, -0.4, 2]}
      rotation={[
        (28 * Math.PI) / 180,
        (-25 * Math.PI) / 180,
        (-4 * Math.PI) / 180,
      ]}
    >
      <meshLine attach="geometry" points={points} />
      <meshLineMaterial
        attach="material"
        color={new THREE.Color(0x000000)}
        lineWidth={0.005}
      />
    </mesh>
  );
};

function Rig({ mouse }) {
  const { camera, viewport } = useThree();
  /*useFrame((state) => {
    /*camera.position.x +=
      (state.mouse.x * viewport.width - camera.position.x) * 0.05;*/ /*
    camera.position.y +=
      (-state.mouse.y * viewport.height - camera.position.y) * 0.02;
    camera.lookAt(0, 0, 0);
  });
  */
  return null;
}

function AppCanvas() {
  return (
    
    <Canvas linear camera={{ position: [0, 0, 10], fov: 25 }}>
      {/* @ts-ignore */}
      <MeshGeometry position={[2, 0, 0]} />
      <Rig />
      {/* @ts-ignore */}
    </Canvas>
    
  );
}

export default AppCanvas;
