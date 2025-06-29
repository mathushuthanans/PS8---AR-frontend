import React, { useRef, useEffect } from 'react';

const CameraGyro = ({ pm25 }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch(err => {
        console.error("Error accessing camera:", err);
      });
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      <video 
        ref={videoRef} 
        autoPlay 
        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
      />
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        backgroundColor: 'rgba(0,0,0,0.7)',
        color: 'white',
        padding: '10px',
        borderRadius: '5px'
      }}>
        Current PM2.5: {pm25} µg/m³
      </div>
    </div>
  );
};

export default CameraGyro;