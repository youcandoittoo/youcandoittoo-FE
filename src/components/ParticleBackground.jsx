// src/components/ParticleBackground.jsx
import React from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

function ParticleBackground() {
  const particlesInit = async (engine) => {
    await loadFull(engine); // 이 부분에서 오류가 발생했던 것
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: {
          enable: true,
          zIndex: -1,
        },
        particles: {
          number: {
            value: 500,
            density: { enable: true, area: 800 },
          },
          color: { value: "#2563eb" },
          shape: { type: "circle" },
          opacity: { value: 0.3, random: true },
          size: { value: { min: 1, max: 4 } },
          move: {
            enable: true,
            speed: 0.6,
            direction: "none",
            outModes: "bounce",
          },
        },
        background: {
          color: "transparent",
        },
      }}
    />
  );
}

export default ParticleBackground;
