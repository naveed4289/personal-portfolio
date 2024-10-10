// src/components/ParticlesBackground.jsx

import React from 'react';
import Particles from 'react-tsparticles';

const ParticlesBackground = () => {
  return (
    <Particles
      id="tsparticles"
      options={{
        fullScreen: {
          enable: true,
          zIndex: -1, // Ensure particles are behind other elements
        },
        particles: {
          number: {
            value: 50, // Number of particles
            density: {
              enable: true,
              value_area: 800, // Area for density calculation
            },
          },
          color: {
            value: "#ffffff", // Particle color
          },
          shape: {
            type: "circle", // Shape of the particles
          },
          opacity: {
            value: 0.5, // Opacity of particles
            random: false,
            anim: {
              enable: false,
            },
          },
          size: {
            value: 5, // Size of the particles
            random: true, // Random size of particles
            anim: {
              enable: false,
            },
          },
          move: {
            enable: true,
            speed: 3, // Speed of particles
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out", // How particles behave on the edges
            bounce: false,
            attract: {
              enable: false,
            },
          },
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onHover: {
              enable: true,
              mode: "repulse", // Effect when hovering
            },
            onClick: {
              enable: true,
              mode: "push", // Effect when clicking
            },
            resize: true,
          },
          modes: {
            grab: {
              distance: 400,
              line_linked: {
                opacity: 1,
              },
            },
            bubble: {
              distance: 400,
              size: 40,
              duration: 2,
              opacity: 8,
              speed: 3,
            },
            repulse: {
              distance: 200,
              duration: 1,
            },
            push: {
              particles_nb: 4,
            },
            remove: {
              particles_nb: 2,
            },
          },
        },
        retina_detect: true, // Detect retina display
      }}
    />
  );
};

export default ParticlesBackground;
