import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { ContactShadows, Sparkles } from "@react-three/drei";
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

interface EnergyTrailProps {
  active: boolean;
  color: string;
  phase: number;
  radius: number;
  speed: number;
  tilt: [number, number, number];
}

const LOGO_SCALE = 0.00725;
const LOGO_CENTER = 256 * LOGO_SCALE;
const TRAIL_SEGMENTS = 180;

function MonogramMesh({ active }: { active: boolean }) {
  const svg = useLoader(SVGLoader, mtMonogramUrl);
  const groupRef = useRef<THREE.Group>(null);

  const materials = useMemo(
    () => [
      new THREE.MeshPhysicalMaterial({
        color: "#050711",
        clearcoat: 1,
        clearcoatRoughness: 0.16,
        emissive: "#050711",
        emissiveIntensity: 0.18,
        metalness: 0.78,
        roughness: 0.21,
      }),
      new THREE.MeshPhysicalMaterial({
        color: "#0b1220",
        clearcoat: 1,
        clearcoatRoughness: 0.12,
        emissive: "#07111f",
        emissiveIntensity: 0.25,
        metalness: 0.82,
        roughness: 0.18,
      }),
      new THREE.MeshPhysicalMaterial({
        color: "#38e8ff",
        clearcoat: 1,
        clearcoatRoughness: 0.08,
        emissive: "#0ea5e9",
        emissiveIntensity: 0.54,
        metalness: 0.88,
        roughness: 0.12,
      }),
      new THREE.MeshPhysicalMaterial({
        color: "#a855f7",
        clearcoat: 1,
        clearcoatRoughness: 0.08,
        emissive: "#7c3aed",
        emissiveIntensity: 0.48,
        metalness: 0.86,
        roughness: 0.13,
      }),
      new THREE.MeshPhysicalMaterial({
        color: "#24d8ff",
        clearcoat: 1,
        clearcoatRoughness: 0.1,
        emissive: "#0ea5e9",
        emissiveIntensity: 0.34,
        metalness: 0.92,
        roughness: 0.15,
      }),
      new THREE.MeshPhysicalMaterial({
        color: "#123177",
        clearcoat: 0.82,
        clearcoatRoughness: 0.2,
        emissive: "#0f172a",
        emissiveIntensity: 0.18,
        metalness: 0.9,
        roughness: 0.22,
      }),
      new THREE.MeshPhysicalMaterial({
        color: "#eef7ff",
        clearcoat: 1,
        clearcoatRoughness: 0.07,
        ior: 1.58,
        metalness: 0.72,
        reflectivity: 0.94,
        roughness: 0.1,
      }),
      new THREE.MeshPhysicalMaterial({
        color: "#7df6ff",
        clearcoat: 1,
        clearcoatRoughness: 0.04,
        emissive: "#67e8f9",
        emissiveIntensity: 0.3,
        metalness: 0.62,
        opacity: 0.58,
        roughness: 0.08,
        transparent: true,
      }),
      new THREE.MeshPhysicalMaterial({
        color: "#ffffff",
        clearcoat: 1,
        clearcoatRoughness: 0.04,
        emissive: "#c4b5fd",
        emissiveIntensity: 0.18,
        metalness: 0.5,
        opacity: 0.66,
        roughness: 0.08,
        transparent: true,
      }),
    ],
    [],
  );

  const pieces = useMemo<LogoPiece[]>(() => {
    const extrude = {
      bevelEnabled: true,
      bevelSegments: 8,
      bevelSize: 2.35,
      bevelThickness: 2.6,
      curveSegments: 72,
      depth: 20,
    };

    return svg.paths.flatMap((path, pathIndex) =>
      SVGLoader.createShapes(path).map((shape, shapeIndex) => {
        const geometry = new THREE.ExtrudeGeometry(shape, extrude);
        geometry.computeBoundingBox();
        geometry.computeVertexNormals();

        return {
          geometry,
          materialIndex: Math.min(pathIndex, materials.length - 1),
          offset: pathIndex * 1.18,
          key: `${pathIndex}-${shapeIndex}`,
        };
      }),
    );
  }, [materials.length, svg.paths]);

  useFrame(({ clock }, delta) => {
    if (!groupRef.current) {
      return;
    }

    const targetScale = active ? 1.09 : 1;
    const scale = THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, 0.08);

    groupRef.current.rotation.y += delta * (active ? 0.58 : 0.31);
    groupRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.7) * 0.045;
    groupRef.current.scale.setScalar(scale);
  });

  return (
    <group ref={groupRef}>
      <group position={[-LOGO_CENTER, LOGO_CENTER, -0.1]} scale={[LOGO_SCALE, -LOGO_SCALE, LOGO_SCALE]}>
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

function NucleusAura({ active }: { active: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshBasicMaterial>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) {
      return;
    }

    const pulse = Math.sin(clock.elapsedTime * 2.2) * 0.055;
    const targetOpacity = active ? 0.34 : 0.18;

    if (materialRef.current) {
      materialRef.current.opacity = THREE.MathUtils.lerp(materialRef.current.opacity, targetOpacity, 0.08);
    }

    meshRef.current.scale.setScalar(1.62 + pulse + (active ? 0.1 : 0));
  });

  return (
    <mesh ref={meshRef} renderOrder={-2}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshBasicMaterial
        ref={materialRef}
        blending={THREE.AdditiveBlending}
        color="#7c3aed"
        depthWrite={false}
        opacity={0.18}
        transparent
      />
    </mesh>
  );
}

function EnergyRings({ active }: { active: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const cyanMaterialRef = useRef<THREE.MeshBasicMaterial>(null);
  const violetMaterialRef = useRef<THREE.MeshBasicMaterial>(null);

  useFrame((_, delta) => {
    if (!groupRef.current) {
      return;
    }

    groupRef.current.rotation.z += delta * (active ? 0.72 : 0.36);
    groupRef.current.rotation.y -= delta * 0.12;

    if (cyanMaterialRef.current) {
      cyanMaterialRef.current.opacity = THREE.MathUtils.lerp(cyanMaterialRef.current.opacity, active ? 0.9 : 0.62, 0.08);
    }

    if (violetMaterialRef.current) {
      violetMaterialRef.current.opacity = THREE.MathUtils.lerp(violetMaterialRef.current.opacity, active ? 0.72 : 0.44, 0.08);
    }
  });

  return (
    <group ref={groupRef}>
      <mesh rotation={[0, 0, 0]}>
        <torusGeometry args={[1.72, 0.017, 16, 192]} />
        <meshBasicMaterial
          ref={cyanMaterialRef}
          blending={THREE.AdditiveBlending}
          color="#67e8f9"
          depthWrite={false}
          opacity={0.62}
          transparent
        />
      </mesh>
      <mesh rotation={[1.08, 0.36, 0.28]} scale={[1, 0.78, 1]}>
        <torusGeometry args={[1.95, 0.011, 12, 192]} />
        <meshBasicMaterial
          ref={violetMaterialRef}
          blending={THREE.AdditiveBlending}
          color="#c084fc"
          depthWrite={false}
          opacity={0.44}
          transparent
        />
      </mesh>
    </group>
  );
}

function EnergyTrail({ active, color, phase, radius, speed, tilt }: EnergyTrailProps) {
  const lineRef = useRef<THREE.Line>(null);
  const [tiltX, tiltY, tiltZ] = tilt;
  const geometry = useMemo(() => {
    const points = Array.from({ length: TRAIL_SEGMENTS + 1 }, (_, index) => {
      const angle = (index / TRAIL_SEGMENTS) * Math.PI * 2;

      return new THREE.Vector3(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius * 0.36,
        Math.sin(angle * 2 + phase) * 0.16,
      );
    });

    return new THREE.BufferGeometry().setFromPoints(points);
  }, [phase, radius]);
  const material = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        blending: THREE.AdditiveBlending,
        color,
        depthWrite: false,
        opacity: active ? 0.54 : 0.32,
        transparent: true,
      }),
    [active, color],
  );
  const line = useMemo(() => {
    const energyLine = new THREE.Line(geometry, material);

    energyLine.rotation.set(tiltX, tiltY, tiltZ);

    return energyLine;
  }, [geometry, material, tiltX, tiltY, tiltZ]);

  useFrame((_, delta) => {
    if (lineRef.current) {
      lineRef.current.rotation.z += delta * speed * (active ? 1.55 : 1);
    }
  });

  return <primitive ref={lineRef} object={line} />;
}

function NucleusScene({ active }: { active: boolean }) {
  return (
    <>
      <ambientLight intensity={0.72} />
      <directionalLight castShadow color="#dbeafe" intensity={2.2} position={[3.4, 4.2, 5.2]} />
      <pointLight color="#67e8f9" intensity={22} position={[-2.8, 1.4, 3.6]} />
      <pointLight color="#c084fc" intensity={18} position={[2.4, -1.6, 2.8]} />
      <spotLight
        castShadow
        angle={0.46}
        color="#ffffff"
        intensity={18}
        penumbra={0.82}
        position={[0, 3.8, 5.4]}
        shadow-mapSize-height={1024}
        shadow-mapSize-width={1024}
      />
      <NucleusAura active={active} />
      <EnergyRings active={active} />
      <EnergyTrail active={active} color="#67e8f9" phase={0} radius={2.22} speed={0.22} tilt={[0.92, 0.18, -0.35]} />
      <EnergyTrail active={active} color="#c084fc" phase={1.8} radius={2.05} speed={-0.18} tilt={[-0.72, 0.32, 0.58]} />
      <Sparkles count={58} color="#93c5fd" opacity={0.58} scale={[4.6, 3.2, 4.6]} size={1.8} speed={active ? 0.72 : 0.34} />
      <MonogramMesh active={active} />
      <ContactShadows blur={2.8} color="#020617" far={5} opacity={0.46} position={[0, -1.7, -0.78]} scale={4.4} />
    </>
  );
}

export function AtomicNucleus({ active, onActiveChange }: AtomicNucleusProps) {
  return (
    <div
      aria-label="Rotating 3D MT monogram nucleus"
      className="atomic-nucleus-canvas"
      onPointerCancel={() => onActiveChange(false)}
      onPointerEnter={() => onActiveChange(true)}
      onPointerLeave={() => onActiveChange(false)}
      role="img"
    >
      <Canvas
        camera={{ fov: 36, position: [0, 0, 7.2] }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        onCreated={({ gl }) => {
          gl.outputColorSpace = THREE.SRGBColorSpace;
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.14;
        }}
        shadows
      >
        <Suspense fallback={null}>
          <NucleusScene active={active} />
        </Suspense>
      </Canvas>
    </div>
  );
}
