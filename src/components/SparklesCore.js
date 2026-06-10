"use client";

import { useId, useCallback } from "react";
import Particles from "@tsparticles/react";
import { ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

function ParticlesCanvas({
  id,
  className,
  background = "transparent",
  minSize = 1,
  maxSize = 3,
  speed = 4,
  particleColor = "#000000",
  particleDensity = 120,
}) {
  const generatedId = useId();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className={cn("sparkles-initial", className)}
    >
      <Particles
        id={id || generatedId}
        className="sparkles-canvas"
        options={{
          background: {
            color: { value: background },
          },
          fullScreen: {
            enable: false,
            zIndex: 1,
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: { enable: true, mode: "push" },
              onHover: { enable: false, mode: "repulse" },
            },
            modes: {
              push: { quantity: 4 },
              repulse: { distance: 200, duration: 0.4 },
            },
          },
          particles: {
            color: {
              value: particleColor,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: { default: "out" },
              random: false,
              speed: { min: 0.1, max: 1 },
              straight: false,
            },
            number: {
              density: { enable: true, width: 400, height: 400 },
              value: particleDensity,
            },
            opacity: {
              value: { min: 0.1, max: 1 },
              animation: {
                enable: true,
                speed: speed,
                sync: false,
                startValue: "random",
              },
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: minSize, max: maxSize },
            },
            links: {
              enable: false,
            },
          },
          detectRetina: true,
        }}
      />
    </motion.div>
  );
}

export default function SparklesCore(props) {
  const initParticles = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <ParticlesProvider init={initParticles}>
      <ParticlesCanvas {...props} />
    </ParticlesProvider>
  );
}
