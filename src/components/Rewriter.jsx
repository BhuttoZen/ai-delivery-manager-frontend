import { useState } from 'react'
import api from '../services/api'

export default function Rewriter(){
  const [tone, setTone] = useState('client')
  const [text, setText] = useState('')
  const [resp, setResp] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function generate(){
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
      <h2>Rewrite Summary</h2>
      <div className="controls">
        <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 13, color: 'var(--muted)' }}>Tone</span>
          <select value={tone} onChange={e => setTone(e.target.value)}>
            <option value="client">Client</option>
            <option value="technical">Technical</option>
            <option value="executive">Executive</option>
          </select>
        </label>
      </div>
      <div style={{ marginBottom: 8 }}>
        <label style={{ fontSize: 13, color: 'var(--muted)' }}>Source text (optional)</label>
        <textarea rows={4} cols={60} value={text} onChange={e => setText(e.target.value)} style={{ width: '100%', marginTop: 6, borderRadius:6, padding:8 }} />
      </div>
      <div className="controls"><button className="btn primary" onClick={generate} disabled={loading}>{loading? 'Generating...' : 'Generate'}</button></div>
      {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
      {resp ? (
        <div style={{ marginTop: 12 }}>
          <div className="field"><strong>Tone</strong><div>{resp.tone}</div></div>
          <div className="field"><strong>Rewritten</strong><div>{resp.rewritten_summary}</div></div>
        </div>
      ) : (
        <div className="pre">No data yet</div>
      )}
    </div>
  )
}
