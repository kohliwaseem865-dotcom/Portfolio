"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

interface FloatingObjectsProps {
  lowTier?: boolean;
}

/**
 * The hero's sculptural centerpiece: a slowly rotating faceted crystal with a
 * wireframe shell, an orbiting torus, and a few small polyhedra bobbing via
 * drei's <Float>. Materials are lightly metallic so they catch the colored
 * Lightformers set up in HeroScene.
 */
export function FloatingObjects({ lowTier = false }: FloatingObjectsProps) {
  const coreRef = useRef<THREE.Group>(null);
  const orbitRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.18;
      coreRef.current.rotation.x += delta * 0.05;
    }
    if (orbitRef.current) {
      orbitRef.current.rotation.z += delta * 0.35;
      orbitRef.current.rotation.y += delta * 0.12;
    }
  });

  const coreDetail = lowTier ? 0 : 1;

  return (
    <group>
      {/* Faceted crystal core */}
      <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.7}>
        <group ref={coreRef}>
          <mesh castShadow>
            <icosahedronGeometry args={[1.35, coreDetail]} />
            <meshStandardMaterial
              color="#1a1830"
              metalness={0.9}
              roughness={0.18}
              emissive="#2a1a5e"
              emissiveIntensity={0.35}
              flatShading
            />
          </mesh>
          {/* Wireframe shell */}
          <mesh scale={1.02}>
            <icosahedronGeometry args={[1.35, coreDetail]} />
            <meshBasicMaterial
              color="#8b7cff"
              wireframe
              transparent
              opacity={0.18}
            />
          </mesh>
        </group>
      </Float>

      {/* Orbiting torus ring */}
      <group ref={orbitRef} rotation={[Math.PI / 3, 0, 0]}>
        <mesh>
          <torusGeometry args={[2.6, 0.018, 8, lowTier ? 80 : 160]} />
          <meshBasicMaterial color="#38e6ff" transparent opacity={0.4} />
        </mesh>
        <mesh position={[2.6, 0, 0]}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshStandardMaterial
            color="#38e6ff"
            emissive="#38e6ff"
            emissiveIntensity={2}
          />
        </mesh>
      </group>

      {/* Small floating polyhedra */}
      {!lowTier && (
        <>
          <Float speed={2} rotationIntensity={1.4} floatIntensity={1.6}>
            <mesh position={[3.1, 1.4, -1.2]}>
              <octahedronGeometry args={[0.42, 0]} />
              <meshStandardMaterial
                color="#0f1030"
                metalness={0.85}
                roughness={0.25}
                emissive="#38e6ff"
                emissiveIntensity={0.25}
                flatShading
              />
            </mesh>
          </Float>

          <Float speed={1.6} rotationIntensity={1.1} floatIntensity={1.3}>
            <mesh position={[-3.2, -1.1, -0.8]}>
              <dodecahedronGeometry args={[0.5, 0]} />
              <meshStandardMaterial
                color="#17132f"
                metalness={0.8}
                roughness={0.3}
                emissive="#7c5cff"
                emissiveIntensity={0.3}
                flatShading
              />
            </mesh>
          </Float>

          <Float speed={2.4} rotationIntensity={1.6} floatIntensity={1.8}>
            <mesh position={[-2.4, 2.1, -1.6]} rotation={[0.4, 0.6, 0]}>
              <boxGeometry args={[0.42, 0.42, 0.42]} />
              <meshStandardMaterial
                color="#0f1030"
                metalness={0.85}
                roughness={0.25}
                emissive="#5cff9d"
                emissiveIntensity={0.18}
                flatShading
              />
            </mesh>
          </Float>
        </>
      )}
    </group>
  );
}
