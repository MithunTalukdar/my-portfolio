import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";
import mtMonogramUrl from "../assets/mt-monogram.svg";

interface AtomicNucleusProps {
  active: boolean;
  onActiveChange: (active: boolean) => void;
}

interface LogoPiece {
  geometry: THREE.ExtrudeGeometry;
  materialIndex: number;
  offset: number;
  key: string;
}

const LOGO_SCALE = 0.0085;

function CenteredMTLogo({ active }: { active: boolean }) {
  const svg = useLoader(SVGLoader, mtMonogramUrl);
  const groupRef = useRef<THREE.Group>(null);

  // Vibrant high-specular materials for the MT logo
  const materials = useMemo(
    () => [
      // 0: Deep space disc backing with glowing rim
      new THREE.MeshPhysicalMaterial({
        color: "#0a1128",
        emissive: "#1e1b4b",
        emissiveIntensity: 0.6,
        metalness: 0.9,
        roughness: 0.12,
        clearcoat: 1,
      }),
      // 1: Inner ring border
      new THREE.MeshPhysicalMaterial({
        color: "#0f172a",
        emissive: "#0284c7",
        emissiveIntensity: 0.6,
        metalness: 0.92,
        roughness: 0.1,
        clearcoat: 1,
      }),
      // 2: Outer neon cyan arc
      new THREE.MeshPhysicalMaterial({
        color: "#00f0ff",
        emissive: "#00e5ff",
        emissiveIntensity: 2.2,
        metalness: 0.6,
        roughness: 0.05,
        clearcoat: 1,
      }),
      // 3: Outer neon purple arc
      new THREE.MeshPhysicalMaterial({
        color: "#c084fc",
        emissive: "#a855f7",
        emissiveIntensity: 1.8,
        metalness: 0.6,
        roughness: 0.05,
        clearcoat: 1,
      }),
      // 4: "M" Letter Face (Vivid Electric Cyan / Cobalt)
      new THREE.MeshPhysicalMaterial({
        color: "#38bdf8",
        emissive: "#0ea5e9",
        emissiveIntensity: 1.5,
        metalness: 0.88,
        roughness: 0.06,
        clearcoat: 1,
      }),
      // 5: "M" Letter Shade
      new THREE.MeshPhysicalMaterial({
        color: "#1d4ed8",
        emissive: "#1e40af",
        emissiveIntensity: 0.8,
        metalness: 0.92,
        roughness: 0.1,
        clearcoat: 1,
      }),
      // 6: "T" Letter Face (Brilliant Chrome Silver-White)
      new THREE.MeshPhysicalMaterial({
        color: "#ffffff",
        emissive: "#f0f9ff",
        emissiveIntensity: 1.2,
        metalness: 0.96,
        roughness: 0.04,
        clearcoat: 1,
      }),
      // 7: Top Cyan Sheen Accent
      new THREE.MeshPhysicalMaterial({
        color: "#67e8f9",
        emissive: "#38bdf8",
        emissiveIntensity: 1.1,
        metalness: 0.5,
        roughness: 0.06,
        transparent: true,
        opacity: 0.9,
      }),
      // 8: Top White Highlight Accent
      new THREE.MeshPhysicalMaterial({
        color: "#ffffff",
        emissive: "#ffffff",
        emissiveIntensity: 1.0,
        metalness: 0.5,
        roughness: 0.05,
        transparent: true,
        opacity: 0.95,
      }),
    ],
    [],
  );

  // Extrude and center geometry around (0, 0, 0)
  const pieces = useMemo<LogoPiece[]>(() => {
    const extrude = {
      bevelEnabled: true,
      bevelSegments: 6,
      bevelSize: 2.4,
      bevelThickness: 2.6,
      curveSegments: 64,
      depth: 16,
    };

    const totalPaths = svg.paths.length;
    const midOffset = (totalPaths * 0.9) / 2;

    return svg.paths.flatMap((path, pathIndex) =>
      SVGLoader.createShapes(path).map((shape, shapeIndex) => {
        const geometry = new THREE.ExtrudeGeometry(shape, extrude);
        // Translate center of SVG (256, 256) to (0, 0, 0)
        geometry.translate(-256, -256, 0);
        geometry.computeBoundingBox();
        geometry.computeVertexNormals();

        return {
          geometry,
          materialIndex: Math.min(pathIndex, materials.length - 1),
          offset: pathIndex * 0.9 - midOffset,
          key: `${pathIndex}-${shapeIndex}`,
        };
      }),
    );
  }, [materials.length, svg.paths]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    // Smooth continuous 3D rotation strictly around dead-center (0, 0, 0)
    groupRef.current.rotation.y += delta * (active ? 0.75 : 0.45);
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <group scale={[LOGO_SCALE, -LOGO_SCALE, LOGO_SCALE]}>
        {pieces.map((piece) => (
          <mesh
            key={piece.key}
            castShadow
            receiveShadow
            geometry={piece.geometry}
            material={materials[piece.materialIndex]}
            position={[0, 0, piece.offset]}
          />
        ))}
      </group>
    </group>
  );
}

function AtmosphereLaserRings({ active }: { active: boolean }) {
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (ring1.current) {
      ring1.current.rotation.z += delta * (active ? 1.5 : 0.85);
      ring1.current.rotation.y += delta * 0.25;
    }
    if (ring2.current) {
      ring2.current.rotation.z -= delta * (active ? 1.2 : 0.65);
      ring2.current.rotation.x += delta * 0.3;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Cyan Laser Ring */}
      <mesh ref={ring1} rotation={[1.15, 0.2, 0]}>
        <torusGeometry args={[2.1, 0.024, 16, 120]} />
        <meshStandardMaterial
          color="#22d3ee"
          emissive="#38bdf8"
          emissiveIntensity={active ? 3.4 : 2.4}
          transparent
          opacity={0.88}
        />
      </mesh>

      {/* Purple Laser Ring */}
      <mesh ref={ring2} rotation={[-0.85, 0.4, 0.3]}>
        <torusGeometry args={[2.35, 0.02, 16, 120]} />
        <meshStandardMaterial
          color="#c084fc"
          emissive="#a855f7"
          emissiveIntensity={active ? 3.0 : 2.2}
          transparent
          opacity={0.82}
        />
      </mesh>
    </group>
  );
}

function CosmicScene({ active }: { active: boolean }) {
  return (
    <>
      <ambientLight intensity={1.4} />
      <directionalLight color="#ffffff" intensity={4.5} position={[4, 5, 6]} />
      <pointLight color="#38bdf8" intensity={active ? 50 : 35} position={[-3, 2, 4]} />
      <pointLight color="#c084fc" intensity={active ? 45 : 30} position={[3, -2, 4]} />
      <pointLight color="#ffffff" intensity={30} position={[0, 0, 5]} />

      <AtmosphereLaserRings active={active} />

      {/* Centered MT Logo directly at (0, 0, 0) */}
      <CenteredMTLogo active={active} />

      <Sparkles
        count={active ? 55 : 30}
        scale={[4.4, 4.4, 4.4]}
        size={active ? 2.2 : 1.6}
        speed={active ? 1.2 : 0.6}
        color="#38bdf8"
      />
      <Sparkles
        count={active ? 35 : 20}
        scale={[4.0, 4.0, 4.0]}
        size={active ? 1.8 : 1.2}
        speed={active ? 1.0 : 0.5}
        color="#c084fc"
      />
    </>
  );
}

export function AtomicNucleus({ active, onActiveChange }: AtomicNucleusProps) {
  return (
    <div
      aria-label="3D Centered MT Monogram Core"
      className="atomic-nucleus-canvas size-full"
      onPointerEnter={() => onActiveChange(true)}
      onPointerLeave={() => onActiveChange(false)}
      role="img"
    >
      <Canvas
        camera={{ fov: 38, position: [0, 0, 7.2] }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          <CosmicScene active={active} />
        </Suspense>
      </Canvas>
    </div>
  );
}
