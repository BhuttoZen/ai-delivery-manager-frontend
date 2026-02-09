import { useState } from 'react'
import api from '../services/api'

export default function RiskAnalysis(){
  const [resp, setResp] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function generate(){
    setLoading(true)
    setError(null)
    try{
      const data = await api.riskAnalysis()
      setResp(data)
    }catch(e){
      setError(e.message)
    }finally{
      setLoading(false)
    }
  }

  return (
    <div>
      <h2>Risk Analysis</h2>
      <div className="controls"><button className="btn primary" onClick={generate} disabled={loading}>{loading? 'Analyzing...' : 'Analyze Risks'}</button></div>
      {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
      {resp ? (
        <div style={{ marginTop: 12 }}>
          <div className="field"><strong>Risks</strong>
            <ul>{(resp.risks || []).map((r, i) => (<li key={i}><strong>{r.type}:</strong> {r.description}</li>))}</ul>
          </div>
        </div>
      ) : (
        <div className="pre">No data yet</div>
      )}
    </div>
  )
}
