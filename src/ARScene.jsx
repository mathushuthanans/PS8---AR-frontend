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
        const sphere = document.createElement('a-sphere')
        sphere.setAttribute('radius', '0.05')
        sphere.setAttribute('color', '#FF0000')
        sphere.setAttribute(
          'position',
          `${(Math.random() - 0.5) * 2} ${(Math.random() * 2) + 1} -3`
        )
        sphere.addEventListener('click', () => {
          alert(`PM2.5 = ${pm25} µg/m³`)
        })
        parent.appendChild(sphere)
      }
    }

    sceneEl.addEventListener('loaded', onLoad)
    return () => sceneEl.removeEventListener('loaded', onLoad)
  }, [pm25])

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
