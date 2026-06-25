import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars } from "@react-three/drei";
import { useRef } from "react";
import type { Mesh } from "three";

function OrbitalShape() {
  const mesh = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (!mesh.current) return;
    mesh.current.rotation.x += delta * 0.18;
    mesh.current.rotation.y += delta * 0.28;
  });

  return (
    <Float speed={1.4} rotationIntensity={0.45} floatIntensity={1.2}>
      <mesh ref={mesh} position={[2.7, 0.6, -1.8]}>
        <torusKnotGeometry args={[0.9, 0.18, 160, 18]} />
        <meshStandardMaterial color="#67e8f9" emissive="#7c3aed" emissiveIntensity={0.22} opacity={0.34} roughness={0.28} transparent metalness={0.72} />
      </mesh>
    </Float>
  );
}

export function ThreeBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 opacity-35">
      <Canvas camera={{ position: [0, 0, 6], fov: 55 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.6} />
        <pointLight position={[4, 3, 4]} intensity={2.2} color="#22d3ee" />
        <pointLight position={[-4, -2, 3]} intensity={1.4} color="#c084fc" />
        <Stars radius={90} depth={45} count={1800} factor={4} saturation={0} fade speed={0.7} />
        <OrbitalShape />
      </Canvas>
    </div>
  );
}
