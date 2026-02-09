import { useState } from 'react'
import Standup from './components/Standup'
import WeeklyReport from './components/WeeklyReport'
import Rewriter from './components/Rewriter'
import RiskAnalysis from './components/RiskAnalysis'
import GenerateAll from './components/GenerateAll'
import './App.css'

function App(){
  const [view, setView] = useState('home')

  return (
    <div className="app-container">
      <aside className="sidebar">
        <div className="brand">
          <div style={{width:40,height:40,background:'#eef2ff',borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center'}}>
            <strong style={{color:'var(--accent)'}}>AI</strong>
          </div>
          <h1>AI Delivery Manager</h1>
        </div>

        <button className={`nav-btn ${view==='standup'?'active':''}`} onClick={() => setView('standup')}>Daily Standup</button>
        <button className={`nav-btn ${view==='weekly'?'active':''}`} onClick={() => setView('weekly')}>Weekly Report</button>
        <button className={`nav-btn ${view==='rewrite'?'active':''}`} onClick={() => setView('rewrite')}>Rewriter</button>
        <button className={`nav-btn ${view==='risk'?'active':''}`} onClick={() => setView('risk')}>Risk Analysis</button>
        <button className={`nav-btn ${view==='all'?'active':''}`} onClick={() => setView('all')}>Generate All</button>
      </aside>

      <main className="main">
        {view === 'home' && <div className="card"><p>Select a report from the left to generate. Use "Generate All" for a demo preview.</p></div>}
        {view === 'standup' && <div className="card"><Standup /></div>}
        {view === 'weekly' && <div className="card"><WeeklyReport /></div>}
        {view === 'rewrite' && <div className="card"><Rewriter /></div>}
        {view === 'risk' && <div className="card"><RiskAnalysis /></div>}
        {view === 'all' && <div className="card"><GenerateAll /></div>}
      </main>
    </div>
  )
}

export default App
