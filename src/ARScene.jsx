// src/ARScene.jsx
import React, { useEffect, useRef } from 'react'
import 'aframe'
import 'ar.js'

export default function ARScene({ pm25 }) {
  const sceneRef = useRef()

  useEffect(() => {
    const sceneEl = sceneRef.current

    const onLoad = () => {
      console.log('AR scene loaded—creating particles')
      const parent = sceneEl.querySelector('#particles')
      const count = Math.pow(pm25, 1.5)

      for (let i = 0; i < count; i++) {
        const molecule = document.createElement('a-entity')

        // Center blue sphere (similar to red in image)
        const center = document.createElement('a-sphere')
        center.setAttribute('radius', '0.08')
        center.setAttribute('color', randomBlueColor())
        center.setAttribute('position', '0 0 0')
        molecule.appendChild(center)

        // Left smaller sphere
        const left = document.createElement('a-sphere')
        left.setAttribute('radius', '0.05')
        left.setAttribute('color', randomBlueColor())
        left.setAttribute('position', '-0.12 0 0')
        molecule.appendChild(left)

        // Right smaller sphere
        const right = document.createElement('a-sphere')
        right.setAttribute('radius', '0.05')
        right.setAttribute('color', randomBlueColor())
        right.setAttribute('position', '0.12 0 0')
        molecule.appendChild(right)

        // Place whole molecule randomly
        molecule.setAttribute(
          'position',
          `${(Math.random() - 0.5) * 2} ${(Math.random() * 2) + 1} -3`
        )

        molecule.addEventListener('click', () => {
          alert(`PM2.5 = ${pm25} µg/m³`)
        })

        parent.appendChild(molecule)
      }
    }

    sceneEl.addEventListener('loaded', onLoad)
    return () => sceneEl.removeEventListener('loaded', onLoad)
  }, [pm25])

  // Generate a random blue tone
  function randomBlueColor() {
    const hue = 200 + Math.random() * 60 // blue range
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
