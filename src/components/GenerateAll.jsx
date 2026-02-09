import { useState } from 'react'
import api from '../services/api'

export default function GenerateAll(){
  const [report, setReport] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function runAll(){
    setLoading(true)
    setError(null)
    try{
      const daily = await api.dailyStandup()
      const weekly = await api.weeklyClient()
      const risks = await api.riskAnalysis()
      setReport({ daily, weekly, risks })
    }catch(e){
      setError(e.message)
    }finally{
      setLoading(false)
    }
  }

  return (
    <div>
      <h2>Generate All Reports</h2>
      <div className="controls"><button className="btn primary" onClick={runAll} disabled={loading}>{loading ? 'Running...' : 'Generate All'}</button></div>
      {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
      {report ? (
        <div style={{ marginTop: 12 }}>
          <section className="field">
            <h3>Daily Standup</h3>
            <div><strong>Yesterday:</strong> {report.daily?.summary?.yesterday}</div>
            <div><strong>Today:</strong> {report.daily?.summary?.today}</div>
            <div><strong>Blockers:</strong> {report.daily?.summary?.blockers}</div>
          </section>
          <section className="field" style={{ marginTop: 12 }}>
            <h3>Weekly</h3>
            <div><strong>Overview:</strong> {report.weekly?.overview}</div>
            <div><strong>Progress:</strong> {report.weekly?.progress}</div>
          </section>
          <section className="field" style={{ marginTop: 12 }}>
            <h3>Risks</h3>
            <ul>{(report.risks?.risks || []).map((r, i) => <li key={i}><strong>{r.type}:</strong> {r.description}</li>)}</ul>
          </section>
        </div>
      ) : (
        <div className="pre" style={{ marginTop: 12 }}>No combined report yet</div>
      )}
    </div>
  )
}
