import { useState } from "react"
import api from "../services/api"

export default function Rewriter(){
  const [tone, setTone] = useState("client")
  const [text, setText] = useState("")
  const [resp, setResp] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function rewrite(){
    setLoading(true)
    setError(null)
    try{
      const data = await api.rewriteSummary(tone, text)
      setResp(data)
    }catch(e){
      setError(e.message)
    }finally{
      setLoading(false)
    }
  }

  return (
    <div>
      <h2>Rewriter</h2>
      <div className="card">
        <h3 style={{margin: "0 0 16px 0", fontSize: 14, fontWeight: 600}}>Rewrite Summary</h3>
        <div style={{marginBottom: 12}}>
          <strong style={{display: "block", marginBottom: 6}}>Tone</strong>
          <select value={tone} onChange={e=>setTone(e.target.value)} style={{width: "100%"}}>
            <option value="client">Client</option>
            <option value="technical">Technical</option>
            <option value="executive">Executive</option>
          </select>
        </div>
        <div style={{marginBottom: 12}}>
          <strong style={{display: "block", marginBottom: 6}}>Text</strong>
          <textarea value={text} onChange={e=>setText(e.target.value)} style={{width: "100%", minHeight: 100}} placeholder="Paste summary text here..."></textarea>
        </div>
        <button className="btn primary" onClick={rewrite} disabled={loading}>{loading? "Rewriting..." : "Rewrite"}</button>
      </div>
      {error && <div className="card" style={{ backgroundColor: "var(--danger-light)", borderLeft: "4px solid var(--danger)", color: "var(--danger)" }}>{error}</div>}
      {resp && (
        <div className="card">
          <div className="field">
            <strong>Rewritten ({resp.tone})</strong>
            <div style={{marginTop: 8}}>{resp.rewritten_summary}</div>
          </div>
        </div>
      )}
    </div>
  )
}
