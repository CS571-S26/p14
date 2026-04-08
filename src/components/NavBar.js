import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import './NavBar.css';

function NavBar() {
  const location = useLocation();
  const { saved } = useApp();
  const savedCount = Object.values(saved).filter(Boolean).length;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">🏮</span>
          <span className="logo-text">Discover China</span>
        </Link>
        <div className="navbar-links">
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
            Home
          </Link>
          <Link to="/saved" className={`nav-link ${location.pathname === '/saved' ? 'active' : ''}`}>
            Saved Places
            {savedCount > 0 && <span className="nav-badge">{savedCount}</span>}
          </Link>
          <Link to="/about" className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}>
            About Us
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
