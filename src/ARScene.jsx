import React, { useEffect, useRef } from 'react';
import 'aframe';
import 'ar.js';

const THREE = window.THREE;

const ARScene = ({ pm25 }) => {
  const sceneRef = useRef();
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    const sceneEl = sceneRef.current;
    const parent = sceneEl.querySelector('#particles');

    // Initial burst in all directions
    const count = Math.pow(pm25, 1.3);
    for (let i = 0; i < count; i++) {
      const molecule = createMolecule(pm25);
      
      const distance = 1 + Math.random() * 3;
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      
      const x = distance * Math.sin(phi) * Math.cos(theta);
      const y = distance * Math.sin(phi) * Math.sin(theta);
      const z = -distance * Math.cos(phi);
      
      molecule.setAttribute('position', `${x} ${y} ${z}`);
      parent.appendChild(molecule);
    }

    // Continuous spawning
    const interval = setInterval(() => {
      const molecule = createMolecule(pm25);
      
      const distance = 1 + Math.random() * 3;
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      
      const x = distance * Math.sin(phi) * Math.cos(theta);
      const y = distance * Math.sin(phi) * Math.sin(theta);
      const z = -distance * Math.cos(phi);
      
      molecule.setAttribute('position', `${x} ${y} ${z}`);
      parent.appendChild(molecule);

      if (parent.children.length > 100) {
        parent.removeChild(parent.children[0]);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [pm25]);

  function createMolecule(pm25) {
    const molecule = document.createElement('a-entity');

    const center = document.createElement('a-sphere');
    center.setAttribute('radius', '0.05');
    center.setAttribute('color', randomGradientColor());
    center.setAttribute('position', '0 0 0');
    molecule.appendChild(center);

    const left = document.createElement('a-sphere');
    left.setAttribute('radius', '0.03');
    left.setAttribute('color', randomGradientColor());
    left.setAttribute('position', '-0.06 0 0');
    molecule.appendChild(left);

    const right = document.createElement('a-sphere');
    right.setAttribute('radius', '0.03');
    right.setAttribute('color', randomGradientColor());
    right.setAttribute('position', '0.06 0 0');
    molecule.appendChild(right);

    molecule.setAttribute('animation__rot', 'property: rotation; to: 0 360 0; loop: true; dur: 20000; easing: linear');
    molecule.setAttribute('random-drift', '');

    return molecule;
  }

  function randomGradientColor() {
    const lightness = 20 + Math.random() * 60;
    return `hsl(0, 0%, ${lightness}%)`;
  }

  return (
    <a-scene
      ref={sceneRef}
      embedded
      arjs="sourceType: webcam; debugUIEnabled: false; trackingMethod: best;"
      renderer="antialias: true; colorManagement: true;"
      style={{
        width: '100vw',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1000
      }}
    >
      <a-entity id="particles"></a-entity>
      
      <a-camera 
        fov="60" 
        position="0 1.6 0"
        wasd-controls-enabled="false"
      ></a-camera>
      
      <a-marker preset="hiro">
        <a-entity></a-entity>
      </a-marker>
    </a-scene>
  );
};

// Register custom component
if (typeof AFRAME !== 'undefined' && !AFRAME.components['random-drift']) {
  AFRAME.registerComponent('random-drift', {
    schema: {
      maxDistance: { type: 'number', default: 1 }
    },
    init() {
      this.origin = this.el.object3D.position.clone();
      this.velocity = {
        x: (Math.random() - 0.5) * 0.001,
        y: (Math.random() - 0.5) * 0.001,
        z: (Math.random() - 0.5) * 0.001
      };
    },
    tick(time, deltaTime) {
      const pos = this.el.object3D.position;
      const dt = deltaTime || 16;
      pos.x += this.velocity.x * dt;
      pos.y += this.velocity.y * dt;
      pos.z += this.velocity.z * dt;

      const offset = {
        x: pos.x - this.origin.x,
        y: pos.y - this.origin.y,
        z: pos.z - this.origin.z
      };

      const { maxDistance } = this.data;
      if (Math.abs(offset.x) > maxDistance) this.velocity.x *= -1;
      if (Math.abs(offset.y) > maxDistance) this.velocity.y *= -1;
      if (Math.abs(offset.z) > maxDistance) this.velocity.z *= -1;
    }
  });
}

export default ARScene;