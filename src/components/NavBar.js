import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import './NavBar.css';

function NavBar() {
  const { pathname } = useLocation();
  const { saved } = useApp();
  const savedCount = Object.values(saved).filter(Boolean).length;

  return (
    <Navbar className="app-navbar" expand="md" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="app-navbar-brand">
          <span className="logo-icon">🏮</span>
          <div className="logo-text-group">
            <span className="logo-text">Discover China</span>
            <span className="logo-tagline">Your China travel inspiration guide</span>
          </div>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="app-nav-collapse" className="app-navbar-toggle" />

        <Navbar.Collapse id="app-nav-collapse">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" className={`app-nav-link${pathname === '/' ? ' app-nav-link--active' : ''}`}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/saved" className={`app-nav-link${pathname === '/saved' ? ' app-nav-link--active' : ''}`}>
              Saved Places
              {savedCount > 0 && <span className="nav-badge">{savedCount}</span>}
            </Nav.Link>
            <Nav.Link as={Link} to="/about" className={`app-nav-link${pathname === '/about' ? ' app-nav-link--active' : ''}`}>
              About Us
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
