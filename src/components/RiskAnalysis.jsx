import { useState } from "react"
import api from "../services/api"

export default function RiskAnalysis(){
  const [resp, setResp] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function analyze(){
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
      <div className="controls"><button className="btn primary" onClick={analyze} disabled={loading}>{loading? "Analyzing..." : "Analyze"}</button></div>
      {error && <div className="card" style={{ backgroundColor: "var(--danger-light)", borderLeft: "4px solid var(--danger)", color: "var(--danger)" }}>{error}</div>}
      {resp ? (
        <div className="card">
          <div className="field"><strong>Identified Risks</strong>
            {(resp.risks || []).length === 0 ? (
              <div style={{color: "var(--success)"}}> No immediate risks detected</div>
            ) : (
              <div>
                {(resp.risks || []).map((r, i) => (
                  <div key={i} className="compact-row" style={{marginBottom:8}}>
                    <div style={{fontWeight:600}}>{r.type}</div>
                    <div style={{marginTop:6, color:'var(--gray-700)'}}>{r.description}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="card" style={{ textAlign: "center", color: "var(--gray-500)", padding: 32 }}>
          <p>Click "Analyze" to identify risks</p>
        </div>
      )}
    </div>
  )
}
