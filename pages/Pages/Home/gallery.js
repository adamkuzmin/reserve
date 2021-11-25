import * as THREE from "three";
import React, {
  Suspense,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { useAspect, Html, TorusKnot, Plane } from "@react-three/drei";
import { Flex, Box, useReflow } from "@react-three/flex";

const state = {
  top: 0,
};

function BackGrid() {
  const { scene } = useThree();
  useEffect(() => {
    scene.fog = new THREE.FogExp2(0, 0.05);
  }, [scene]);

  return (
    <Plane
      position={[0, -1, -8]}
      rotation={[Math.PI / 2, 0, 0]}
      args={[80, 80, 128, 128]}
    >
      <meshStandardMaterial color="#ea5455" wireframe side={THREE.DoubleSide} />
    </Plane>
  );
}

function RotatingObj() {
  const ref = useRef();
  useFrame(
    ({ clock }) =>
      (ref.current.rotation.x = ref.current.rotation.y = clock.getElapsedTime())
  );
  return (
    <TorusKnot
      ref={ref}
      position={[0, 0, 0]}
      scale={[0.3, 0.3, 0.3]}
      args={[1, 0.4, 128, 32]}
    >
      <meshStandardMaterial />
    </TorusKnot>
  );
}

function Page({ onChangePages }) {
  const group = useRef();
  const { viewport, size } = useThree();
  const [vpWidth, vpHeight] = useAspect(size.width, size.height);
  const vec = new THREE.Vector3();
  useFrame(() =>
    group.current.position.lerp(vec.set(0, state.top / 100, 0), 0.1)
  );
  const handleReflow = useCallback(
    (w, h) => {
      onChangePages(h / vpHeight);
      // console.log({ h, vpHeight, pages: h / vpHeight });
    },
    [onChangePages, vpHeight]
  );

  return (
    <group ref={group}>
      <BackGrid />

      <Flex
        flexDirection="column"
        size={[vpWidth, vpHeight, 0]}
        onReflow={handleReflow}
        position={[-vpWidth / 2, vpHeight / 2, 0]}
      >
        <group position-z={-0.3}>
          <Box
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            flexWrap="wrap"
            width="100%"
            marginTop={0.3}
            marginBottom={0.1}
          >
            <Box centerAnchor>
              <RotatingObj />
            </Box>
          </Box>
          <Box
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            flexWrap="wrap"
            width="100%"
            marginTop={0.1}
            marginBottom={0.5}
          ></Box>
        </group>

        <Flex
          dir="column"
          position={[-viewport.width / 2, viewport.height / 2, 0]}
          size={[viewport.width, viewport.height, 0]}
          // width="70%"
        >
          <Box margin={0.01} width="100%" key={"Box332"}>
            <mesh position={[1, 0.5, 0]}>
              <planeBufferGeometry args={[1, 1]} />
              <meshStandardMaterial color={"#ffffff"} />
            </mesh>
          </Box>
          <Box margin={0.01} width="70%" key={"Box332"}>
            <mesh position={[1, 0.5, 0]}>
              <planeBufferGeometry args={[1, 1]} />
              <meshStandardMaterial color={"#ffffff"} />
            </mesh>
          </Box>
        </Flex>

        <Box
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          flexWrap="wrap"
          width="100%"
          // width="70%"
        >
          {new Array(8 * 4).fill(0).map((k, i) => (
            <Box margin={0.05} key={i}>
              <mesh position={[0.5, -0.5, 0]}>
                <planeBufferGeometry args={[1, 1]} />
                <meshStandardMaterial
                  color={["#2d4059", "#ea5455", "#decdc3", "#e5e5e5"][i % 4]}
                />
              </mesh>
            </Box>
          ))}
        </Box>
      </Flex>
    </group>
  );
}

export default function Gallery() {
  const scrollArea = useRef();
  const onScroll = (e) => (state.top = e.target.scrollTop);
  // useEffect(() => void onScroll({ target: scrollArea.current }), [])
  const [pages, setPages] = useState(0);
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas
        raycaster={{ enabled: false }}
        gl={{ alpha: false }}
        camera={{ position: [0, 0, 2], zoom: 1 }}
        // orthographic
        // pixelRatio={window.devicePixelRatio}
      >
        <pointLight position={[0, 1, 4]} intensity={0.1} />
        <ambientLight intensity={0.2} />
        <spotLight
          position={[1, 1, 1]}
          penumbra={1}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />

        <Suspense fallback={<Html center>loading..</Html>}>
          <Page onChangePages={setPages} />
          {/* <Cube /> */}
        </Suspense>
      </Canvas>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          overflow: "auto",
        }}
        className="scrollArea"
        ref={scrollArea}
        onScroll={onScroll}
      >
        <div style={{ height: `${pages * 100}vh` }} />
      </div>
    </div>
  );
}
