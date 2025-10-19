import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import InvestmentDashboard from './InvestmentDashboard';
import LearningCenter from './LearningCenter';
import StockDetail from './StockDetail';
import './App.css';
import AddInvestment from './AddInvestment';

function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/' || location.pathname === '/dashboard';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="main-nav">
      <div className="nav-brand">
        <button 
          className={`nav-link ${isActive('/') ? 'active' : ''}`}
          onClick={() => navigate('/dashboard')}
        >
          <h2>InvestVision</h2>
        </button>
      </div>
      <div className="nav-links">
        <button 
          className={`nav-link ${isActive('/') ? 'active' : ''}`}
          onClick={() => navigate('/dashboard')}
        >
          Dashboard
        </button>
        <button 
          className={`nav-link ${isActive('/learning') ? 'active' : ''}`}
          onClick={() => navigate('/learning')}
        >
          Learning Center
        </button>
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <main>
          <Routes>
            <Route path="/" element={<InvestmentDashboard />} />
            <Route path="/dashboard" element={<InvestmentDashboard />} />
            <Route path="/learning" element={<LearningCenter />} />
            <Route path="/stock/:symbol" element={<StockDetail />} />
            <Route path="/add-investment" element={<AddInvestment />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;