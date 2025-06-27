import React, { useEffect, useRef } from 'react'
import 'aframe'
import 'ar.js'

const THREE = window.THREE

export default function ARScene({ pm25 }) {
  const sceneRef = useRef()
  const hasInitialized = useRef(false)

  useEffect(() => {
    if (hasInitialized.current) return
    hasInitialized.current = true

    const sceneEl = sceneRef.current
    const parent = sceneEl.querySelector('#particles')
    const camera = sceneEl.querySelector('a-camera')

    // Initial burst in all directions
    const count = Math.pow(pm25, 1.3)
    for (let i = 0; i < count; i++) {
      const molecule = createMolecule(pm25)
      
      // Spawn in a sphere around the user
      const distance = 2 + Math.random() * 4 // Increased distance range (2-6 meters)
      const theta = Math.random() * 2 * Math.PI
      const phi = Math.acos(2 * Math.random() - 1)
      
      const x = distance * Math.sin(phi) * Math.cos(theta)
      const y = distance * Math.sin(phi) * Math.sin(theta)
      const z = distance * Math.cos(phi)
      
      molecule.setAttribute('position', `${x} ${y} ${z}`)
      parent.appendChild(molecule)
    }

    // Continuous spawning in all directions
    const interval = setInterval(() => {
      if (!camera || !camera.object3D) return

      const molecule = createMolecule(pm25)
      
      // Spawn in a sphere around the user
      const distance = 2 + Math.random() * 4
      const theta = Math.random() * 2 * Math.PI
      const phi = Math.acos(2 * Math.random() - 1)
      
      const x = distance * Math.sin(phi) * Math.cos(theta)
      const y = distance * Math.sin(phi) * Math.sin(theta)
      const z = distance * Math.cos(phi)
      
      molecule.setAttribute('position', `${x} ${y} ${z}`)
      parent.appendChild(molecule)

      if (parent.children.length > 300) {
        parent.removeChild(parent.children[0])
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [pm25])

  function createMolecule(pm25) {
    const molecule = document.createElement('a-entity')

    const center = document.createElement('a-sphere')
    center.setAttribute('radius', '0.02')
    center.setAttribute('color', randomGradientColor())
    center.setAttribute('position', '0 0 0')
    molecule.appendChild(center)

    const left = document.createElement('a-sphere')
    left.setAttribute('radius', '0.01')
    left.setAttribute('color', randomGradientColor())
    left.setAttribute('position', '-0.04 0 0')
    molecule.appendChild(left)

    const right = document.createElement('a-sphere')
    right.setAttribute('radius', '0.01')
    right.setAttribute('color', randomGradientColor())
    right.setAttribute('position', '0.04 0 0')
    molecule.appendChild(right)

    molecule.setAttribute('animation__rot', 'property: rotation; to: 0 360 0; loop: true; dur: 20000; easing: linear')
    molecule.setAttribute('random-drift', '')

    molecule.addEventListener('click', () => {
      alert(`PM2.5 = ${pm25} µg/m³`)
    })

    return molecule
  }

  function randomGradientColor() {
    const lightness = Math.random() * 60
    return `hsl(0, 0%, ${lightness}%)`
  }

  return (
    <a-scene
      ref={sceneRef}
      embedded
      arjs="trackingMethod: best; sourceType: webcam; debugUIEnabled: false;"
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
      {/* Camera with wider FOV and zoomed out position */}
      <a-camera 
        fov="80" 
        position="0 1.6 0"
        wasd-controls-enabled="false"
      >
        {/* Add look-controls for mobile compatibility */}
        <a-entity look-controls="pointerLockEnabled: true"></a-entity>
      </a-camera>
    </a-scene>
  )
}

// Floating molecule drift with slower movement
if (typeof AFRAME !== 'undefined' && !AFRAME.components['random-drift']) {
  AFRAME.registerComponent('random-drift', {
    schema: {
      maxDistance: { type: 'number', default: 1.5 }
    },

    init() {
      this.origin = this.el.object3D.position.clone()
      this.velocity = {
        x: (Math.random() - 0.5) * 0.0005,
        y: (Math.random() - 0.5) * 0.0005,
        z: (Math.random() - 0.5) * 0.0005
      }
    },

    tick(time, deltaTime) {
      const pos = this.el.object3D.position
      const dt = deltaTime || 16

      pos.x += this.velocity.x * dt
      pos.y += this.velocity.y * dt
      pos.z += this.velocity.z * dt

      const offset = {
        x: pos.x - this.origin.x,
        y: pos.y - this.origin.y,
        z: pos.z - this.origin.z
      }

      const { maxDistance } = this.data

      if (Math.abs(offset.x) > maxDistance) this.velocity.x *= -1
      if (Math.abs(offset.y) > maxDistance) this.velocity.y *= -1
      if (Math.abs(offset.z) > maxDistance) this.velocity.z *= -1
    }
  })
}