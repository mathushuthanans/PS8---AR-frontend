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
        {loading && <p>Loading air quality data...</p>}
        {error && <p className="error">Error: {error}</p>}
        
        {airData && (
          <div style={{ marginBottom: '20px' }}>
            <h3>Air Quality Data</h3>
            <p>Location: {airData.city}</p>
            <p>PM2.5: {airData.pm25} µg/m³</p>
            <p>PM10: {airData.pm10} µg/m³</p>
          </div>
        )}

        <div style={{ marginTop: '20px' }}>
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
        </div>
        
        <button 
          onClick={() => setShowAR(!showAR)}
          style={{ marginTop: '10px' }}
          disabled={loading}
        >
          {showAR ? 'Hide AR Scene' : 'Show AR Scene'}
        </button>
        
        <button 
          onClick={fetchAirQuality}
          style={{ marginTop: '10px', marginLeft: '10px' }}
        >
          Refresh Data
        </button>
      </div>
      
      {showAR && <ARScene pm25={pm25} />}
    </>
  )
}

export default App