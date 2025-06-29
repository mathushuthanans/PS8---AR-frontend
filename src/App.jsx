import React, { useState, useEffect } from 'react';
import './App.css';
import ARScene from './ARScene';

function App() {
  const [pm25, setPm25] = useState(28);
  const [showAR, setShowAR] = useState(false);
  const [airData, setAirData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAirQuality = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/get_location');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setAirData(data);
      setPm25(data.pm25);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching air quality:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAirQuality();
  }, []);

  return (
    <div className="app-container">
      {!showAR ? (
        <div className="activities-container">
          <h1>Activities</h1>
          
          <section className="section">
            <h2>Google Chrome</h2>
            <ul className="activity-list">
              <li>DBALAM.BL/GAN555</li>
              <li>QT WhatsApp Business</li>
              <li>GitHub SSH Setup Quiz</li>
              <li>Manage access</li>
              <li>DeepSeek - Into the Un</li>
              <li>Vite + React</li>
            </ul>
          </section>

          <section className="section">
            <h2>Project Backend</h2>
            <ul className="activity-list">
              <li>my steps</li>
              <li>Calendar</li>
              <li>Keep</li>
              <li>NotebookLM</li>
              <li>GitHub</li>
              <li>HuggFace</li>
              <li>GeminiAPI</li>
              <li>rosamag.sh</li>
              <li>CP tracker</li>
              <li>pdb – backend</li>
            </ul>
          </section>

          <section className="section">
            <h2>Demo Mode</h2>
            <div className="slider-container">
              <label>
                Adjust PM2.5 Level (for demo):
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={pm25} 
                  onChange={(e) => setPm25(e.target.value)}
                />
                <span className="pm-value">{pm25} µg/m³</span>
              </label>
            </div>
          </section>

          <section className="section">
            <h2>AR Scene</h2>
            <p>Enter full-screen to launch the AR experience.</p>
            <button 
              className="ar-button"
              onClick={() => setShowAR(true)}
            >
              Enter AR Scene
            </button>
          </section>
        </div>
      ) : (
        <div className="ar-container">
          <ARScene pm25={pm25} />
          <button 
            className="close-ar-button"
            onClick={() => setShowAR(false)}
          >
            Close AR Scene
          </button>
        </div>
      )}
    </div>
  );
}

export default App;