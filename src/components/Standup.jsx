import { useState } from 'react'
import api from '../services/api'

export default function Standup() {
  const [resp, setResp] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function generate() {
    setLoading(true)
    setError(null)
    try {
      const data = await api.dailyStandup()
      setResp(data)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2>Daily Standup</h2>
      <div className="controls">
        <button className="btn primary" onClick={generate} disabled={loading}>{loading? 'Generating...' : 'Generate'}</button>
      </div>
      {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
      {resp ? (
        <div style={{ marginTop: 12 }}>
          <div className="field"><strong>Yesterday</strong><div>{resp.summary?.yesterday}</div></div>
          <div className="field"><strong>Today</strong><div>{resp.summary?.today}</div></div>
          <div className="field"><strong>Blockers</strong><div>{resp.summary?.blockers}</div></div>
        </div>
      ) : (
        <div className="pre">No data yet</div>
      )}
    </div>
  )
}
