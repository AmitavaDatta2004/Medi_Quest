"use client";

import { useCallback } from "react";
import Particles from "react-tsparticles";
import type { Engine } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";

export function Background() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <>
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50" />
      <Particles
        className="fixed inset-0 -z-10"
        init={particlesInit}
        options={{
          particles: {
            number: {
              value: 50,
              density: {
                enable: true,
                value_area: 800,
              },
            },
            color: {
              value: ["#60A5FA", "#818CF8", "#A78BFA"],
            },
            shape: {
              type: "circle",
            },
            opacity: {
              value: 0.5,
              random: true,
              animation: {
                enable: true,
                speed: 1,
                minimumValue: 0.1,
                sync: false,
              },
            },
            size: {
              value: 3,
              random: true,
              animation: {
                enable: true,
                speed: 2,
                minimumValue: 0.5,
                sync: false,
              },
            },
            links: {
              enable: true,
              distance: 150,
              color: "#A78BFA",
              opacity: 0.4,
              width: 1,
            },
            move: {
              enable: true,
              speed: 1,
              direction: "none",
              random: true,
              straight: false,
              outModes: {
                default: "bounce",
              },
              attract: {
                enable: true,
                rotateX: 600,
                rotateY: 1200,
              },
            },
          },
          interactivity: {
            detectsOn: "canvas",
            events: {
              onHover: {
                enable: true,
                mode: "grab",
              },
              onClick: {
                enable: true,
                mode: "push",
              },
              resize: true,
            },
            modes: {
              grab: {
                distance: 140,
                links: {
                  opacity: 0.5,
                },
              },
              push: {
                quantity: 4,
              },
            },
          },
          background: {
            color: {
              value: "transparent",
            },
          },
          fullScreen: {
            enable: false,
            zIndex: -10,
          },
          detectRetina: true,
        }}
      />
    </>
  );
}