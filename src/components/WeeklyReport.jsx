import { useState, useEffect } from "react"
import api from "../services/api"

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

  useEffect(()=>{
    function handler(){ generate() }
    window.addEventListener("reports:refresh", handler)
    return ()=> window.removeEventListener("reports:refresh", handler)
  }, [])

  return (
    <div>
      <h2>Weekly Client Report</h2>
      <div className="controls"><button className="btn primary" onClick={generate} disabled={loading}>{loading? "Generating..." : "Generate Report"}</button></div>
      {error && <div className="card" style={{ backgroundColor: "var(--danger-light)", borderLeft: "4px solid var(--danger)", color: "var(--danger)" }}>{error}</div>}
      {resp ? (
        <div>
          <div className="card">
            <div className="field"><strong>Overview</strong><div>{resp.overview}</div></div>
            <div style={{marginTop: 16, paddingTop: 16, borderTop: "1px solid var(--gray-200)"}}>
              <div className="field"><strong>Progress</strong><div style={{fontSize: 20, fontWeight: 700, color: "var(--success)"}}>{resp.progress}</div></div>
            </div>
          </div>
          <div className="card">
            <div className="field"><strong>Milestones</strong>
              <ul>{(resp.milestones || []).map((m, i) => <li key={i}>{m}</li>)}</ul>
            </div>
          </div>
          {resp.details?.tickets && resp.details.tickets.length ? (
            <div className="card">
              <div className="field"><strong>Tickets</strong>
                {resp.details.tickets.map((t) => (
                  <CompactTicket key={t.key} t={t} />
                ))}
              </div>
            </div>
          ) : null}
          <div className="card">
            <div className="field"><strong>Risks & Blockers</strong>
              {((resp.risks || []).length === 0) && !(resp.details && resp.details.blockers && resp.details.blockers.length) ? (
                <div style={{color: "var(--success)"}}> No risks detected</div>
              ) : (
                <div>
                  {(resp.risks || []).length ? (
                    <ul>{(resp.risks || []).map((r, i) => <li key={i} style={{color: "var(--danger)"}}>{r}</li>)}</ul>
                  ) : null}
                  {resp.details?.blockers?.length ? (
                    resp.details.blockers.map((b) => (
                      <CompactTicket key={b.key} t={b} isBlocker={true} />
                    ))
                  ) : null}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="card" style={{ textAlign: "center", color: "var(--gray-500)", padding: 32 }}>
          <p>Click "Generate Report" to see this week'"'"'s summary</p>
        </div>
      )}
    </div>
  )
}

function initials(name){
  if(!name) return ''
  return name.split(' ').map(p=>p[0]).join('').slice(0,2).toUpperCase()
}

function CompactTicket({t, isBlocker}){
  const [open, setOpen] = useState(false)
  return (
    <div style={{marginBottom:12}}>
      <div className="compact-row" style={{display:'flex', alignItems:'center', gap:12}}>
        <div className="ticket-key" style={{minWidth:72}}>{t.key}</div>
        <div style={{flex:1}}>
          <div style={{fontWeight:600}}>{t.title}</div>
          <div className="small-meta">
            {t.assignee ? <span className="assignee-initials">{initials(t.assignee)}</span> : <span style={{color:'var(--gray-500)'}}>Unassigned</span>}
            {isBlocker && t.waiting_on && t.waiting_on.length ? <span style={{marginLeft:8, color:'var(--gray-600)'}}>waiting on {t.waiting_on.join(', ')}</span> : null}
          </div>
        </div>
        <button className="btn" style={{padding:'6px 10px'}} onClick={()=>setOpen(s=>!s)}>{open? 'Hide' : 'Details'}</button>
      </div>
      {open ? (
        <div style={{marginTop:8}}>
          <div className="ticket-card">
            <div style={{display:'flex', gap:12}}>
              <div className="ticket-key">{t.key}</div>
              <div style={{flex:1}}>
                <div className="ticket-title">{t.title}</div>
                {t.assignee && <div className="assignee-badge">{t.assignee}</div>}
                {t.waiting_on && t.waiting_on.length ? (
                  <div style={{marginTop:8, display:'flex', gap:8}}>{t.waiting_on.map(w => <div key={w} style={{padding:'4px 8px', background:'var(--gray-100)', borderRadius:4, fontSize:12}}>{w}</div>)}</div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
