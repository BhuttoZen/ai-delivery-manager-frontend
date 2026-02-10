import { useState, useEffect } from "react"
import api from "../services/api"

function initials(name){
  if(!name) return ''
  return name.split(' ').map(p=>p[0]).join('').slice(0,2).toUpperCase()
}

export default function Standup() {
  const [resp, setResp] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [expanded, setExpanded] = useState({})

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

  useEffect(()=>{
    function handler(){ generate() }
    window.addEventListener("reports:refresh", handler)
    return ()=> window.removeEventListener("reports:refresh", handler)
  }, [])

  function toggle(key){
    setExpanded(prev => ({...prev, [key]: !prev[key]}))
  }

  return (
    <div>
      <h2>Daily Standup</h2>
      <div className="controls">
        <button className="btn primary" onClick={generate} disabled={loading}>{loading? "Generating..." : "Generate Report"}</button>
      </div>
      {error && <div className="card" style={{ backgroundColor: "var(--danger-light)", borderLeft: "4px solid var(--danger)", color: "var(--danger)" }}>{error}</div>}
      {resp ? (
        <div>
          <div className="card">
            <div className="field">
              <strong>Yesterday</strong>
              <div className="compact-row">{resp.summary?.yesterday}</div>
            </div>

            <div className="field">
              <strong>Today</strong>
              <div>
                {resp.details?.today_items?.length ? (
                  <div>
                    {resp.details.today_items.map((t) => (
                      <div key={t.key} className="compact-row" style={{display: 'flex', alignItems: 'center', gap:12}}>
                        <div className="ticket-key" style={{minWidth:72}}>{t.key}</div>
                        <div style={{flex:1}}>
                          <div style={{fontWeight:600}}>{t.title}</div>
                          <div className="small-meta">
                            {t.assignee ? (
                              <span className="assignee-initials">{initials(t.assignee)}</span>
                            ) : <span style={{color:'var(--gray-500)'}}>Unassigned</span>}
                          </div>
                        </div>
                        <button className="btn" style={{padding:'6px 10px'}} onClick={()=>toggle(t.key)}>{expanded[t.key]? 'Hide' : 'Details'}</button>
                        {expanded[t.key] ? (
                          <div style={{width:'100%', marginTop:8}}>
                            <div className="ticket-card">
                              <div style={{display:'flex', gap:12}}>
                                <div className="ticket-key">{t.key}</div>
                                <div style={{flex:1}}>
                                  <div className="ticket-title">{t.title}</div>
                                  {t.assignee && <div className="assignee-badge">{t.assignee}</div>}
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : null}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="compact-row">{resp.summary?.today}</div>
                )}
              </div>
            </div>

            <div className="field">
              <strong>Blockers</strong>
              <div>
                {resp.details?.blockers?.length ? (
                  <div>
                    {resp.details.blockers.map((b) => (
                      <div key={b.key} className="compact-row" style={{display:'flex', alignItems:'center', gap:12}}>
                        <div className="ticket-key" style={{minWidth:72}}>{b.key}</div>
                        <div style={{flex:1}}>
                          <div style={{fontWeight:600}}>{b.title}</div>
                          <div className="small-meta">
                            {b.assignee ? <span className="assignee-initials">{initials(b.assignee)}</span> : <span style={{color:'var(--gray-500)'}}>Unassigned</span>}
                            {b.waiting_on && b.waiting_on.length ? <span style={{marginLeft:8, color:'var(--gray-600)'}}>waiting on {b.waiting_on.join(', ')}</span> : null}
                          </div>
                        </div>
                        <button className="btn" style={{Padding:'6px 10px'}} onClick={()=>toggle(b.key)}>{expanded[b.key]? 'Hide' : 'Details'}</button>
                        {expanded[b.key] ? (
                          <div style={{width:'100%', marginTop:8}}>
                            <div className="ticket-card">
                              <div style={{display:'flex', gap:12}}>
                                <div className="ticket-key">{b.key}</div>
                                <div style={{flex:1}}>
                                  <div className="ticket-title">{b.title}</div>
                                  {b.assignee && <div className="assignee-badge">{b.assignee}</div>}
                                  {b.waiting_on && b.waiting_on.length ? (
                                    <div style={{marginTop:8, display:'flex', gap:8}}>
                                      {b.waiting_on.map(w => <div key={w} style={{padding:'4px 8px', background:'var(--gray-100)', borderRadius:4, fontSize:12}}>{w}</div>)}
                                    </div>
                                  ) : null}
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : null}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="compact-row">{resp.summary?.blockers}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="card" style={{ textAlign: "center", color: "var(--gray-500)", padding: 32 }}>
          <p>Click "Generate Report" to see today&apos;s standup</p>
        </div>
      )}
    </div>
  )
}
