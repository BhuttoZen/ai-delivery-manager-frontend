import { useState } from 'react'
import Standup from './components/Standup'
import WeeklyReport from './components/WeeklyReport'
import Rewriter from './components/Rewriter'
import RiskAnalysis from './components/RiskAnalysis'
import GenerateAll from './components/GenerateAll'
import TicketsPage from './pages/TicketsPage'
import MembersPage from './pages/MembersPage'
import PRsPage from './pages/PRsPage'
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
        <button className={`nav-btn ${view==='tickets'?'active':''}`} onClick={() => setView('tickets')}>Tickets</button>
        <button className={`nav-btn ${view==='members'?'active':''}`} onClick={() => setView('members')}>Members</button>
        <button className={`nav-btn ${view==='prs'?'active':''}`} onClick={() => setView('prs')}>Pull Requests</button>
      </aside>

      <main className="main">
        {view === 'home' && <div className="card"><p>Select a report from the left to generate. Use "Generate All" for a demo preview.</p></div>}
        {view === 'standup' && <div className="card"><Standup /></div>}
        {view === 'weekly' && <div className="card"><WeeklyReport /></div>}
        {view === 'rewrite' && <div className="card"><Rewriter /></div>}
        {view === 'risk' && <div className="card"><RiskAnalysis /></div>}
        {view === 'all' && <div className="card"><GenerateAll /></div>}
        {view === 'tickets' && <div className="card"><TicketsPage /></div>}
        {view === 'members' && <div className="card"><MembersPage /></div>}
        {view === 'prs' && <div className="card"><PRsPage /></div>}
      </main>
    </div>
  )
}

export default App
