import * as THREE from "three";
import React, {
  Suspense,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import { Canvas, useThree, useFrame, useLoader } from "@react-three/fiber";
import {
  useAspect,
  Html,
  TorusKnot,
  Plane,
  Image,
  Preload,
  Text,
} from "@react-three/drei";
import { Flex, Box, useReflow, useFlexSize } from "@react-three/flex";
import styled from "styled-components";

const CardHtml = styled(Html)`
  width: ${({ nwidth }) => (nwidth ? `${nwidth * 240}px` : "auto")};
  height: ${({ nheight }) => (nheight ? `${nheight * 240}px` : "auto")};
`;

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
      <meshStandardMaterial
        color="#000000"
        opacity={0.1}
        wireframe
        side={THREE.DoubleSide}
      />
    </Plane>
  );
}

const WhitePlane = ({ color, vpwidth, map, url }) => {
  const [width, height] = useFlexSize();
  const [planeStep, setPlaneStep] = useState(0);
  const [allowToMove, SetAllowToMove] = useState(false);
  const PlaneRef = useRef();
  const MaterialRef = useRef();

  let oneStep = 0.005;

  const easeOutCirc = (x) => {
    return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
  };

  useEffect(() => {
    let timer1 = setTimeout(() => SetAllowToMove(true), Math.random() * 1500);

    return () => {
      clearTimeout(timer1);
    };
  }, []);

  useFrame(() => {
    PlaneRef.current.position.z = -10 + 10 * easeOutCirc(planeStep);
    MaterialRef.current.visible = allowToMove ? true : false;

    if (planeStep < 1 && allowToMove) {
      setPlaneStep(planeStep + oneStep);
    }
  });

  map.anisotropy = 16;
  map.minFilter = THREE.NearestFilter;

  const standardMaterial = (
    <meshLambertMaterial
      map={map && map}
      toneMapped={false}
      ref={MaterialRef}
      color={!map && color}
    />
  );

  return (
    <group ref={PlaneRef}>
      <mesh>
        <planeBufferGeometry args={[width - 0.03, height - 0.03, 2, 2]} />
        {standardMaterial}
      </mesh>
    </group>
  );

  /*
  return (
    <group position-z={0}>
      <Image url={url && url} scale={[width - 0.03, height - 0.03, 2, 2]}/>
    </group>
  );
  */
};

function Page({ onChangePages }) {
  const ImageUrls = [
    "/catalog/1.jpg",
    "/catalog/2.jpg",
    "/catalog/3.jpg",
    "/catalog/4.jpg",
    "/catalog/5.jpg",
    "/catalog/6.jpg",
    "/catalog/7.jpg",
    "/catalog/8.jpg",
    "/catalog/9.jpg",
    "/catalog/10.jpg",
    "/catalog/11.jpg",
    "/catalog/12.jpg",
    "/catalog/13.jpg",
    "/catalog/14.jpg",
    "/catalog/15.jpg",
  ];

  const textures = useLoader(THREE.TextureLoader, [...ImageUrls]);

  const group = useRef();
  const { viewport, size } = useThree();
  const [vpWidth, vpHeight] = useAspect(size.width, size.height);
  const vec = new THREE.Vector3();
  useFrame(() =>
    group.current.position.lerp(vec.set(0, state.top / 100, 0), 0.1)
  );
  const handleReflow = useCallback(
    (w, h) => {
      onChangePages((h * 2) / vpHeight);
    },
    [onChangePages, vpHeight]
  );

  return (
    <group ref={group}>
      {/*<BackGrid />*/}
      {textures.length && (
        <>
          <Flex
            flexDirection="column"
            size={[vpWidth, vpWidth * 0.525, 0]}
            onReflow={handleReflow}
            position={[-vpWidth / 2, (vpWidth * 0.525) / 2, 0]}
          >
            <Box
              marginTop={0.1}
              flexDirection="row"
              height={"100%"}
              justifyContent="space-between"
              size={[vpWidth, vpHeight, 0]}
              onReflow={handleReflow}
            >
              <Box width={`${36.4}%`} height={`100%`} centerAnchor>
                <WhitePlane
                  color={"red"}
                  map={textures[0]}
                  url={ImageUrls[0]}
                />
              </Box>

              <Box
                width={`${100 - 36.4}%`}
                height={`100%`}
                flexDirection="column"
              >
                <Box width={`100%`} height={`50%`} centerAnchor>
                  <WhitePlane
                    color={"white"}
                    map={textures[1]}
                    url={ImageUrls[1]}
                  />
                </Box>
                <Box width={`100%`} height={`50%`} flexDirection="row">
                  <Box width={`62%`} height={`100%`} centerAnchor>
                    <WhitePlane
                      color={"blue"}
                      map={textures[2]}
                      url={ImageUrls[2]}
                    />
                  </Box>
                  <Box width={`38%`} height={`100%`} centerAnchor>
                    <WhitePlane
                      color={"pink"}
                      map={textures[3]}
                      url={ImageUrls[3]}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>

            <Box
              flexDirection="row"
              width={"100%"}
              height={"100%"}
              justifyContent="space-between"
            >
              <Box
                flexDirection="column"
                height={"100%"}
                justifyContent="space-between"
              >
                <Box
                  flexDirection="row"
                  width={"100%"}
                  height={"50%"}
                  justifyContent="space-between"
                  onReflow={handleReflow}
                >
                  <Box width={`${25.1}%`} height={`100%`} centerAnchor>
                    <WhitePlane
                      color={"blue"}
                      map={textures[4]}
                      url={ImageUrls[4]}
                    />
                  </Box>
                  <Box width={`${37.5}%`} height={`100%`} centerAnchor>
                    <WhitePlane
                      color={"white"}
                      map={textures[5]}
                      url={ImageUrls[5]}
                    />
                  </Box>
                  <Box
                    width={`${100 - 25.1 - 37.5}%`}
                    height={`100%`}
                    centerAnchor
                  >
                    <WhitePlane
                      color={"yellow"}
                      map={textures[6]}
                      url={ImageUrls[6]}
                    />
                  </Box>
                </Box>

                <Box
                  flexDirection="row"
                  width={"100%"}
                  height={"50%"}
                  justifyContent="space-between"
                  onReflow={handleReflow}
                >
                  <Box width={`${36.4}%`} height={`100%`} centerAnchor>
                    <WhitePlane
                      color={"green"}
                      map={textures[7]}
                      url={ImageUrls[7]}
                    />
                  </Box>
                  <Box width={`${38.0}%`} height={`100%`} centerAnchor>
                    <WhitePlane
                      color={"purple"}
                      map={textures[8]}
                      url={ImageUrls[8]}
                    />
                  </Box>
                  <Box
                    width={`${100 - 36.4 - 38.0}%`}
                    height={`100%`}
                    centerAnchor
                  >
                    <WhitePlane
                      color={"red"}
                      map={textures[9]}
                      url={ImageUrls[9]}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>

            <Box
              flexDirection="row"
              height={"100%"}
              justifyContent="space-between"
              size={[vpWidth, vpHeight, 0]}
              onReflow={handleReflow}
            >
              <Box
                width={`${100 - 36.4}%`}
                height={`100%`}
                flexDirection="column"
              >
                <Box width={`100%`} height={`50%`} flexDirection="row">
                  <Box width={`36%`} height={`100%`} centerAnchor>
                    <WhitePlane
                      color={"green"}
                      map={textures[10]}
                      url={ImageUrls[10]}
                    />
                  </Box>
                  <Box width={`64%`} height={`100%`} centerAnchor>
                    <WhitePlane
                      color={"purple"}
                      map={textures[11]}
                      url={ImageUrls[11]}
                    />
                  </Box>
                </Box>
                <Box width={`100%`} height={`50%`} flexDirection="row">
                  <Box width={`62%`} height={`100%`} centerAnchor>
                    <WhitePlane
                      color={"blue"}
                      map={textures[12]}
                      url={ImageUrls[12]}
                    />
                  </Box>
                  <Box width={`38%`} height={`100%`} centerAnchor>
                    <WhitePlane
                      color={"pink"}
                      map={textures[14]}
                      url={ImageUrls[14]}
                    />
                  </Box>
                </Box>
              </Box>

              <Box width={`${36.4}%`} height={`100%`} centerAnchor>
                <WhitePlane
                  color={"red"}
                  map={textures[13]}
                  url={ImageUrls[13]}
                />
              </Box>
            </Box>
          </Flex>

          <Flex
            flexDirection="column"
            size={[vpWidth, vpWidth * 0.525, 0]}
            onReflow={handleReflow}
            position={[vpWidth / 2, (vpWidth * 0.525) / 2, 0]}
          >
            <Box
              marginTop={0.1}
              flexDirection="row"
              height={"100%"}
              justifyContent="space-between"
              size={[vpWidth, vpHeight, 0]}
              onReflow={handleReflow}
            >
              <Box width={`${36.4}%`} height={`100%`} centerAnchor>
                <WhitePlane color={"red"} map={textures[0]} />
              </Box>

              <Box
                width={`${100 - 36.4}%`}
                height={`100%`}
                flexDirection="column"
              >
                <Box width={`100%`} height={`50%`} centerAnchor>
                  <WhitePlane color={"white"} map={textures[1]} />
                </Box>
                <Box width={`100%`} height={`50%`} flexDirection="row">
                  <Box width={`62%`} height={`100%`} centerAnchor>
                    <WhitePlane color={"blue"} map={textures[2]} />
                  </Box>
                  <Box width={`38%`} height={`100%`} centerAnchor>
                    <WhitePlane color={"pink"} map={textures[3]} />
                  </Box>
                </Box>
              </Box>
            </Box>

            <Box
              flexDirection="row"
              width={"100%"}
              height={"100%"}
              justifyContent="space-between"
            >
              <Box
                flexDirection="column"
                height={"100%"}
                justifyContent="space-between"
              >
                <Box
                  flexDirection="row"
                  width={"100%"}
                  height={"50%"}
                  justifyContent="space-between"
                  onReflow={handleReflow}
                >
                  <Box width={`${25.1}%`} height={`100%`} centerAnchor>
                    <WhitePlane color={"blue"} map={textures[4]} />
                  </Box>
                  <Box width={`${37.5}%`} height={`100%`} centerAnchor>
                    <WhitePlane color={"white"} map={textures[5]} />
                  </Box>
                  <Box
                    width={`${100 - 25.1 - 37.5}%`}
                    height={`100%`}
                    centerAnchor
                  >
                    <WhitePlane color={"yellow"} map={textures[6]} />
                  </Box>
                </Box>

                <Box
                  flexDirection="row"
                  width={"100%"}
                  height={"50%"}
                  justifyContent="space-between"
                  onReflow={handleReflow}
                >
                  <Box width={`${36.4}%`} height={`100%`} centerAnchor>
                    <WhitePlane color={"green"} map={textures[7]} />
                  </Box>
                  <Box width={`${38.0}%`} height={`100%`} centerAnchor>
                    <WhitePlane color={"purple"} map={textures[8]} />
                  </Box>
                  <Box
                    width={`${100 - 36.4 - 38.0}%`}
                    height={`100%`}
                    centerAnchor
                  >
                    <WhitePlane color={"red"} map={textures[9]} />
                  </Box>
                </Box>
              </Box>
            </Box>

            <Box
              flexDirection="row"
              height={"100%"}
              justifyContent="space-between"
              size={[vpWidth, vpHeight, 0]}
              onReflow={handleReflow}
            >
              <Box
                width={`${100 - 36.4}%`}
                height={`100%`}
                flexDirection="column"
              >
                <Box width={`100%`} height={`50%`} flexDirection="row">
                  <Box width={`36%`} height={`100%`} centerAnchor>
                    <WhitePlane color={"green"} map={textures[10]} />
                  </Box>
                  <Box width={`64%`} height={`100%`} centerAnchor>
                    <WhitePlane color={"purple"} map={textures[11]} />
                  </Box>
                </Box>
                <Box width={`100%`} height={`50%`} flexDirection="row">
                  <Box width={`62%`} height={`100%`} centerAnchor>
                    <WhitePlane color={"blue"} map={textures[12]} />
                  </Box>
                  <Box width={`38%`} height={`100%`} centerAnchor>
                    <WhitePlane color={"pink"} map={textures[14]} />
                  </Box>
                </Box>
              </Box>

              <Box width={`${36.4}%`} height={`100%`} centerAnchor>
                <WhitePlane color={"red"} map={textures[13]} />
              </Box>
            </Box>
          </Flex>
          <Flex
            flexDirection="column"
            size={[vpWidth, vpWidth * 0.525, 0]}
            onReflow={handleReflow}
            position={[-vpWidth + -vpWidth / 2, (vpWidth * 0.525) / 2, 0]}
          >
            <Box
              marginTop={0.1}
              flexDirection="row"
              height={"100%"}
              justifyContent="space-between"
              size={[vpWidth, vpHeight, 0]}
              onReflow={handleReflow}
            >
              <Box width={`${36.4}%`} height={`100%`} centerAnchor>
                <WhitePlane color={"red"} map={textures[0]} />
              </Box>

              <Box
                width={`${100 - 36.4}%`}
                height={`100%`}
                flexDirection="column"
              >
                <Box width={`100%`} height={`50%`} centerAnchor>
                  <WhitePlane color={"white"} map={textures[1]} />
                </Box>
                <Box width={`100%`} height={`50%`} flexDirection="row">
                  <Box width={`62%`} height={`100%`} centerAnchor>
                    <WhitePlane color={"blue"} map={textures[2]} />
                  </Box>
                  <Box width={`38%`} height={`100%`} centerAnchor>
                    <WhitePlane color={"pink"} map={textures[3]} />
                  </Box>
                </Box>
              </Box>
            </Box>

            <Box
              flexDirection="row"
              width={"100%"}
              height={"100%"}
              justifyContent="space-between"
            >
              <Box
                flexDirection="column"
                height={"100%"}
                justifyContent="space-between"
              >
                <Box
                  flexDirection="row"
                  width={"100%"}
                  height={"50%"}
                  justifyContent="space-between"
                  onReflow={handleReflow}
                >
                  <Box width={`${25.1}%`} height={`100%`} centerAnchor>
                    <WhitePlane color={"blue"} map={textures[4]} />
                  </Box>
                  <Box width={`${37.5}%`} height={`100%`} centerAnchor>
                    <WhitePlane color={"white"} map={textures[5]} />
                  </Box>
                  <Box
                    width={`${100 - 25.1 - 37.5}%`}
                    height={`100%`}
                    centerAnchor
                  >
                    <WhitePlane color={"yellow"} map={textures[6]} />
                  </Box>
                </Box>

                <Box
                  flexDirection="row"
                  width={"100%"}
                  height={"50%"}
                  justifyContent="space-between"
                  onReflow={handleReflow}
                >
                  <Box width={`${36.4}%`} height={`100%`} centerAnchor>
                    <WhitePlane color={"green"} map={textures[7]} />
                  </Box>
                  <Box width={`${38.0}%`} height={`100%`} centerAnchor>
                    <WhitePlane color={"purple"} map={textures[8]} />
                  </Box>
                  <Box
                    width={`${100 - 36.4 - 38.0}%`}
                    height={`100%`}
                    centerAnchor
                  >
                    <WhitePlane color={"red"} map={textures[9]} />
                  </Box>
                </Box>
              </Box>
            </Box>

            <Box
              flexDirection="row"
              height={"100%"}
              justifyContent="space-between"
              size={[vpWidth, vpHeight, 0]}
              onReflow={handleReflow}
            >
              <Box
                width={`${100 - 36.4}%`}
                height={`100%`}
                flexDirection="column"
              >
                <Box width={`100%`} height={`50%`} flexDirection="row">
                  <Box width={`36%`} height={`100%`} centerAnchor>
                    <WhitePlane color={"green"} map={textures[10]} />
                  </Box>
                  <Box width={`64%`} height={`100%`} centerAnchor>
                    <WhitePlane color={"purple"} map={textures[11]} />
                  </Box>
                </Box>
                <Box width={`100%`} height={`50%`} flexDirection="row">
                  <Box width={`62%`} height={`100%`} centerAnchor>
                    <WhitePlane color={"blue"} map={textures[12]} />
                  </Box>
                  <Box width={`38%`} height={`100%`} centerAnchor>
                    <WhitePlane color={"pink"} map={textures[14]} />
                  </Box>
                </Box>
              </Box>

              <Box width={`${36.4}%`} height={`100%`} centerAnchor>
                <WhitePlane color={"red"} map={textures[13]} />
              </Box>
            </Box>
          </Flex>
        </>
      )}
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
        //onCreated={({ gl }) => gl.setClearColor("#f5f5f5")}
        gl={{
          powerPreference: "high-performance",
          alpha: true,
          precision: "highp",
          antialias: true,
          stencil: false,
          depth: false,
        }}
        camera={{ position: [0, 0, 2], zoom: 1 }}
        // orthographic
        // pixelRatio={window.devicePixelRatio}
      >
        <pointLight position={[0, 1, 4]} intensity={0.3} />
        <ambientLight intensity={0.4} />
        <spotLight
          position={[1, 1, 1]}
          penumbra={1}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />

        <Suspense fallback={<Html center></Html>}>
          <Page onChangePages={setPages} />
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
