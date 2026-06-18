import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Database, ShoppingBag } from 'lucide-react';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import './index.css';

function App() {
  return (
    <Router>
      <nav>
        <Link to="/" className="nav-brand">
          <ShoppingBag size={24} color="var(--accent)" />
          MongoDB <span>Store</span>
        </Link>
        <div className="nav-links">
          <Link to="/">Accueil</Link>
          <Link to="/demo" className="btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem' }}>
            <Database size={16} />
            <span>Dashboard Évaluation</span>
          </Link>
        </div>
      </nav>

      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/demo" element={<Dashboard />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
