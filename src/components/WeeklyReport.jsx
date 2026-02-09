import { useState } from 'react'
import api from '../services/api'

export default function WeeklyReport(){
  const [resp, setResp] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function generate(){
    setLoading(true)
    setError(null)
    try{
      const data = await api.weeklyClient()
      setResp(data)
    }catch(e){
      setError(e.message)
    }finally{
      setLoading(false)
    }
  }

  return (
    <div>
      <h2>Weekly Client Report</h2>
      <div className="controls"><button className="btn primary" onClick={generate} disabled={loading}>{loading? 'Generating...' : 'Generate'}</button></div>
      {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
      {resp ? (
        <div style={{ marginTop: 12 }}>
          <div className="field"><strong>Overview</strong><div>{resp.overview}</div></div>
          <div className="field"><strong>Progress</strong><div>{resp.progress}</div></div>
          <div className="field"><strong>Milestones</strong>
            <ul>{(resp.milestones || []).map((m, i) => <li key={i}>{m}</li>)}</ul>
          </div>
          <div className="field"><strong>Risks</strong>
            <ul>{(resp.risks || []).map((r, i) => <li key={i}>{r}</li>)}</ul>
          </div>
        </div>
      ) : (
        <div className="pre">No data yet</div>
      )}
    </div>
  )
}
