// src/ARScene.jsx
import React, { useEffect, useRef } from 'react'
import 'aframe'
import 'ar.js'

export default function ARScene({ pm25 }) {
  const sceneRef = useRef()

  useEffect(() => {
    const sceneEl = sceneRef.current

    const onLoad = () => {
      console.log('AR scene loaded—creating molecules')
      const parent = sceneEl.querySelector('#particles')
      const count = Math.pow(pm25, 1.3) // reduce density a bit — looks better

      for (let i = 0; i < count; i++) {
        const molecule = createMolecule(pm25)

        // Spread more horizontally, right bias, random height
        const x = (Math.random() * 2) + 0.5 // shifted to right side
        const y = (Math.random() * 2) + 0.5
        const z = -2.5 + (Math.random() * 1.5) // gentle depth range

        molecule.setAttribute('position', `${x} ${y} ${z}`)

        parent.appendChild(molecule)
      }
    }

    sceneEl.addEventListener('loaded', onLoad)
    return () => sceneEl.removeEventListener('loaded', onLoad)
  }, [pm25])

  // Function to create one molecule (styled, animated)
  function createMolecule(pm25) {
    const molecule = document.createElement('a-entity')

    // Center sphere
    const center = document.createElement('a-sphere')
    center.setAttribute('radius', '0.04')
    center.setAttribute('color', randomBlueColor())
    center.setAttribute('position', '0 0 0')
    center.setAttribute('animation', 'property: scale; dir: alternate; dur: 1500; loop: true; to: 1.2 1.2 1.2')
    molecule.appendChild(center)

    // Left sphere
    const left = document.createElement('a-sphere')
    left.setAttribute('radius', '0.025')
    left.setAttribute('color', randomBlueColor())
    left.setAttribute('position', '-0.07 0 0')
    molecule.appendChild(left)

    // Right sphere
    const right = document.createElement('a-sphere')
    right.setAttribute('radius', '0.025')
    right.setAttribute('color', randomBlueColor())
    right.setAttribute('position', '0.07 0 0')
    molecule.appendChild(right)

    // Gentle rotation animation for whole molecule
    molecule.setAttribute('animation', 'property: rotation; to: 0 360 0; loop: true; dur: 8000; easing: linear')

    molecule.addEventListener('click', () => {
      alert(`PM2.5 = ${pm25} µg/m³`)
    })

    return molecule
  }

  // Random blue color generator
  function randomBlueColor() {
    const hue = 200 + Math.random() * 80 // wider blue-purple range
    return `hsl(${hue}, 80%, 65%)`
  }

  return (
    <a-scene
      ref={sceneRef}
      embedded
      arjs="trackingMethod: best; sourceType: webcam; debugUIEnabled: false;"
      style={{ width: '100vw', height: '100vh', position: 'fixed', top: 0, left: 0 }}
    >
      <a-entity id="particles"></a-entity>
      <a-camera />
    </a-scene>
  )
}
