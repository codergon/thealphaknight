import { proxy, useSnapshot } from "valtio";
import { HexColorPicker } from "react-colorful";
import { Canvas, useFrame } from "@react-three/fiber";
import { useWindowSize } from "@react-hook/window-size/throttled";
import React, { Suspense, useRef, useState, useEffect } from "react";
import { ContactShadows, Environment, useGLTF } from "@react-three/drei";

const state = proxy({
  current: null,
  items: {
    body: "#2b2b2b",
    cap: "#2b2b2b",
  },
});

function Model() {
  const ref = useRef();
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF("../../bottle.glb");

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    ref.current.rotation.z = -0.2 - (1 + Math.sin(t / 1.5)) / 20;

    ref.current.rotation.x = Math.cos(t / 4) / 8;

    ref.current.rotation.y = Math.sin(t / 2);
    ref.current.position.y = (0.7 + Math.sin(t / 4)) / 12;
  });

  const [hovered, set] = useState(null);
  useEffect(() => {
    const cursor = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0)"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><g filter="url(#filter0_d)"><path d="M29.5 47C39.165 47 47 39.165 47 29.5S39.165 12 29.5 12 12 19.835 12 29.5 19.835 47 29.5 47z" fill="${snap.items[hovered]}"/></g><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/><text fill="#000" style="white-space:pre" font-family="Inter var, sans-serif" font-size="10" letter-spacing="-.01em"><tspan x="35" y="63">${hovered}</tspan></text></g><defs><clipPath id="clip0"><path fill="#fff" d="M0 0h64v64H0z"/></clipPath><filter id="filter0_d" x="6" y="8" width="47" height="47" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dy="2"/><feGaussianBlur stdDeviation="3"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/><feBlend in2="BackgroundImageFix" result="effect1_dropShadow"/><feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape"/></filter></defs></svg>`;
    const auto = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/></svg>`;
    const colory = document.getElementById("colory");
    colory.style.cursor = `url('data:image/svg+xml;base64,${btoa(
      hovered ? cursor : auto
    )}'), auto`;
    // eslint-disable-next-line
  }, [hovered]);

  return (
    <group
      ref={ref}
      dispose={null}
      position={[0, -0.1, 0]}
      onPointerOut={(e) => e.intersections.length === 0 && set(null)}
      onPointerMissed={() => (state.current = null)}
      onPointerOver={(e) => {
        e.stopPropagation();
        if (e.object.material.name === "Bottle") {
          set("body");
        }
        if (e.object.material.name === "Material.002") {
          set("cap");
        }
      }}
      onPointerDown={(e) => {
        e.stopPropagation();
        if (e.object.material.name === "Bottle") {
          return (state.current = "body");
        }
        if (e.object.material.name === "Material.002") {
          return (state.current = "cap");
        }
        return (state.current = "body");
      }}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder006.geometry}
        material={materials.Bottle}
        material-color={snap.items.body}
        scale={[1, 5.6, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder006_1.geometry}
        material={materials["Blue Glowing Ring"]}
        material-color="blue"
        scale={[1, 5.6, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Lid_of_Bottle.geometry}
        material={materials["Material.002"]}
        position={[0, -0.055, 0]}
        scale={[1, 6.6, 1]}
        material-color={snap.items.cap}
      />
    </group>
  );
}

function Picker() {
  const snap = useSnapshot(state);
  return (
    <div style={{ display: snap.current ? "flex" : "none" }} className="picker">
      <div className="color_name">
        <p>
          {!!snap.current && snap.current === "cap"
            ? "Lid of Bottle"
            : "Bottle  Container"}
        </p>
      </div>
      <HexColorPicker
        className="picker_box"
        color={snap.items[snap.current]}
        onChange={(color) => (state.items[snap.current] = color)}
      />
    </div>
  );
}

const Modely = ({ refe }) => {
  const snap = useSnapshot(state);
  const [width] = useWindowSize();
  return (
    <div className="t3_cont" id="t3_cont" ref={refe}>
      <div className="t3_conty">
        <div className="txt_for_exm" id="txt_for_exm">
          Yes, why Three Js or 3d? How can it be useful to you? Check out the
          example below. Just like the bottle, you can have your product(s)
          rendered in 3d and customers get to see, test and choose colors or
          materials of what they would be getting. This user experience can help
          boost sales and take your business to new and better levels.
        </div>
        <div
          className="canvaly"
          id="colory"
          style={{ flexDirection: "column" }}
        >
          <div
            className="canvaly"
            style={{ paddingLeft: "0px", paddingRight: "0px" }}
          >
            <div className="canvy_cont">
              <div className="back_scr"></div>
              <Canvas
                shadows
                dpr={[1, 2]}
                camera={{ position: [0, 0, 1.5], fov: 50 }}
                className="canvy"
              >
                <ambientLight intensity={0.7} />
                <spotLight
                  intensity={0.5}
                  angle={0.1}
                  penumbra={1}
                  position={[10, 15, 10]}
                  castShadow
                />
                <Suspense fallback={null}>
                  <Model />
                  <Environment preset="city" />
                  <ContactShadows
                    rotation-x={Math.PI / 2}
                    position={[0, -0.8, 0]}
                    opacity={0.25}
                    width={10}
                    height={10}
                    blur={1.5}
                    far={0.8}
                  />
                </Suspense>
              </Canvas>
            </div>
            <div>
              <Picker />
              {width <= 750 && (
                <div className="view_exm_out">
                  <p>
                    <i className="uil uil-palette"></i> Click Model to change
                    color
                  </p>
                </div>
              )}
            </div>
          </div>
          <div>
            {!snap.current && width > 750 && (
              <div className="view_exm_out">
                <p>
                  <i className="uil uil-palette"></i> Click Model to change
                  color
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Modely;
