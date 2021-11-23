import React, { useMemo, useRef } from "react";
import * as THREE from "three";
import { MeshLine, MeshLineMaterial } from "meshline";
import { extend, Canvas, useFrame, useThree } from "@react-three/fiber";

extend({ MeshLine, MeshLineMaterial });

const MeshGeometry = ({ ...props }) => {
  const points = [
    1,
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
    1,
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
    1,
    0,
    -1,
    1,
    1,
    0.5,
    -1,
    2,
    0.5,
  ];
  /*for (let j = 0; j < Math.PI; j += (2 * Math.PI) / 100) {
    points.push(Math.cos(j), Math.sin(j), 0);
  }
  */

  const Reff = useRef();

  useFrame((state) => {
    Reff.current.rotation.y += 0.0004;
  });

  return (
    <mesh
      ref={Reff}
      position={[0, -0.4, 2]}
      rotation={[(28 * Math.PI) / 180, (-25 * Math.PI) / 180, (-4 * Math.PI) / 180]}
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
      (state.mouse.x * viewport.width - camera.position.x) * 0.05;*//*
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
