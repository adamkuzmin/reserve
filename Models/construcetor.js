import React, { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Line, LineBasicMaterial } from "meshline";
import { extend, Canvas, useFrame, useThree } from "@react-three/fiber";

import styled from "styled-components";
import MeshGeometry from "./mesh-geometry";

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
    <Canvas
      linear
      camera={{ position: [0, 0, 10], fov: 25 }}
      dpr={[1, 2]} //самое важное
      raycaster={{ enabled: false }}
      gl={{
        powerPreference: "high-performance",
        antialias: true,
        stencil: false,
      }}
    >
      {/* @ts-ignore */}
      {<MeshGeometry position={[2, 0, 0]} />}
      <Rig />
      {/* @ts-ignore */}
    </Canvas>
  );
}

export default AppCanvas;
