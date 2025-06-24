// src/App.jsx
import { useState, useEffect } from 'react'
import './App.css'
import ARScene from './ARScene'

function App() {
  const [pm25, setPm25] = useState(0)
  const [showAR, setShowAR] = useState(false)
  const [airData, setAirData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchAirQuality = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/get_location')
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()
      setAirData(data)
      setPm25(data.pm25)
    } catch (err) {
      setError(err.message)
      console.error('Error fetching air quality:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAirQuality()
  }, [])

  return (
    <>
      <div className="card">

        {/* Section 1 — Live Data */}
        <section style={{ marginBottom: '20px' }}>
          <h2>Live Air Quality</h2>
          {loading && <p>Loading air quality data...</p>}
          {error && <p className="error">Error: {error}</p>}
          
          {airData && (
            <div>
              <p><strong>Location:</strong> {airData.city}</p>
              <p><strong>PM2.5:</strong> {airData.pm25} µg/m³</p>
              <p><strong>PM10:</strong> {airData.pm10} µg/m³</p>
            </div>
          )}

          <button 
            onClick={fetchAirQuality}
            style={{ marginTop: '10px' }}
          >
            Refresh Data
          </button>
        </section>

        {/* Section 2 — Demo Mode */}
        <section style={{ marginBottom: '20px' }}>
          <h2>Demo Mode</h2>
          <label>
            Adjust PM2.5 Level (for demo):
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={pm25} 
              onChange={(e) => setPm25(e.target.value)}
              style={{ margin: '0 10px' }}
            />
            {pm25} µg/m³
          </label>
        </section>

        {/* Section 3 — AR Scene Control */}
        <section>
          <h2>AR Scene</h2>
          <p>Enter full-screen to launch the AR experience.</p>
          <button 
            onClick={() => setShowAR(!showAR)}
            disabled={loading}
          >
            {showAR ? 'Close AR Scene' : 'Enter AR Scene'}
          </button>
        </section>

      </div>

      {/* Show AR Scene only when requested */}
      {showAR && <ARScene pm25={pm25} />}
    </>
  )
}

export default App
