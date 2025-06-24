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
      const count = Math.pow(pm25, 1.5)

      for (let i = 0; i < count; i++) {
        const molecule = createMolecule(pm25)
        // Random position for each molecule
        molecule.setAttribute(
          'position',
          `${(Math.random() - 0.5) * 2} ${(Math.random() * 2) + 1} -3`
        )
        parent.appendChild(molecule)
      }
    }

    sceneEl.addEventListener('loaded', onLoad)
    return () => sceneEl.removeEventListener('loaded', onLoad)
  }, [pm25])

  // Function to create one molecule (fixed size, blue tone)
  function createMolecule(pm25) {
    const molecule = document.createElement('a-entity')

    // Center sphere
    const center = document.createElement('a-sphere')
    center.setAttribute('radius', '0.05')
    center.setAttribute('color', randomBlueColor())
    center.setAttribute('position', '0 0 0')
    molecule.appendChild(center)

    // Left sphere
    const left = document.createElement('a-sphere')
    left.setAttribute('radius', '0.03')
    left.setAttribute('color', randomBlueColor())
    left.setAttribute('position', '-0.08 0 0')
    molecule.appendChild(left)

    // Right sphere
    const right = document.createElement('a-sphere')
    right.setAttribute('radius', '0.03')
    right.setAttribute('color', randomBlueColor())
    right.setAttribute('position', '0.08 0 0')
    molecule.appendChild(right)

    // Clickable
    molecule.addEventListener('click', () => {
      alert(`PM2.5 = ${pm25} µg/m³`)
    })

    return molecule
  }

  // Random blue color generator
  function randomBlueColor() {
    const hue = 200 + Math.random() * 60
    return `hsl(${hue}, 80%, 60%)`
  }

  return (
    <a-scene
      ref={sceneRef}
      embedded
      arjs="trackingMethod: best; sourceType: webcam; debugUIEnabled: false;"
    >
      <a-entity id="particles"></a-entity>
      <a-camera />
    </a-scene>
  )
}
