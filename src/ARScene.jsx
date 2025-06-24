// src/ARScene.jsx
import React, { useEffect, useRef } from 'react'
import 'aframe'
import 'ar.js'

export default function ARScene({ pm25 }) {
  const sceneRef = useRef()

  useEffect(() => {
    const sceneEl = sceneRef.current

    const onLoad = () => {
      console.log('AR.js scene loaded — creating molecules')
      const parent = sceneEl.querySelector('#particles')
      const count = Math.pow(pm25, 1.3)

      for (let i = 0; i < count; i++) {
        const molecule = createMolecule(pm25)

        const x = (Math.random() - 0.5) * 4
        const y = (Math.random() - 0.5) * 3 + 1.6
        const z = (Math.random() - 0.5) * 4

        molecule.setAttribute('position', `${x} ${y} ${z}`)

        parent.appendChild(molecule)
      }
    }

    sceneEl.addEventListener('loaded', onLoad)
    return () => sceneEl.removeEventListener('loaded', onLoad)
  }, [pm25])

  function createMolecule(pm25) {
    const molecule = document.createElement('a-entity')

    const center = document.createElement('a-sphere')
    center.setAttribute('radius', '0.035')
    center.setAttribute('color', randomGradientColor())
    center.setAttribute('position', '0 0 0')
    center.setAttribute('animation', 'property: position; dir: alternate; dur: 3000; loop: true; to: 0 0.05 0')
    molecule.appendChild(center)

    const left = document.createElement('a-sphere')
    left.setAttribute('radius', '0.02')
    left.setAttribute('color', randomGradientColor())
    left.setAttribute('position', '-0.06 0 0')
    left.setAttribute('animation', 'property: position; dir: alternate; dur: 3000; loop: true; to: -0.06 0.05 0')
    molecule.appendChild(left)

    const right = document.createElement('a-sphere')
    right.setAttribute('radius', '0.02')
    right.setAttribute('color', randomGradientColor())
    right.setAttribute('position', '0.06 0 0')
    right.setAttribute('animation', 'property: position; dir: alternate; dur: 3000; loop: true; to: 0.06 0.05 0')
    molecule.appendChild(right)

    molecule.setAttribute('animation__rot', 'property: rotation; to: 0 360 0; loop: true; dur: 10000; easing: linear')

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
      <a-camera />
    </a-scene>
  )
}
