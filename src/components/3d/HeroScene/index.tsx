"use client";

import { Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, AdaptiveDpr, Preload } from "@react-three/drei";
import { Particles } from "@/components/3d/Particles";
import { FloatingObjects } from "@/components/3d/FloatingObjects";

interface HeroSceneProps {
  particleCount: number;
  dprCap: [number, number];
  lowTier: boolean;
}

/** Smoothly parallaxes the camera toward the pointer (native R3F pointer). */
function Rig() {
  useFrame((state, delta) => {
    const { pointer, camera, clock } = state;
    const targetX = pointer.x * 0.9;
    const targetY = pointer.y * 0.6 + Math.sin(clock.elapsedTime * 0.2) * 0.12;
    const k = Math.min(1, delta * 2.2);
    camera.position.x += (targetX - camera.position.x) * k;
    camera.position.y += (targetY - camera.position.y) * k;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function HeroScene({ particleCount, dprCap, lowTier }: HeroSceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 42 }}
      dpr={dprCap}
      gl={{ antialias: !lowTier, alpha: true, powerPreference: "high-performance" }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.35} />
        <pointLight position={[6, 6, 6]} intensity={30} color="#7c5cff" />
        <pointLight position={[-6, -4, 2]} intensity={18} color="#38e6ff" />

        {/* Procedural studio environment — no external HDR, baked once. */}
        <Environment resolution={lowTier ? 128 : 256} frames={1}>
          <Lightformer
            intensity={2.2}
            color="#7c5cff"
            position={[-3, 2, 3]}
            scale={[5, 5, 1]}
          />
          <Lightformer
            intensity={1.6}
            color="#38e6ff"
            position={[3, -1, 2]}
            scale={[5, 5, 1]}
          />
          <Lightformer
            intensity={1}
            color="#ffffff"
            position={[0, 3, -4]}
            scale={[8, 2, 1]}
          />
        </Environment>

        <Rig />
        <FloatingObjects lowTier={lowTier} />
        <Particles count={particleCount} />

        <AdaptiveDpr pixelated={false} />
        <Preload all />
      </Suspense>
    </Canvas>
  );
}
