import React from 'react';
import { Container } from 'react-bootstrap';
import './PageHero.css';

function PageHero({ icon, title, subtitle }) {
  return (
    <div className="page-hero">
      <Container>
        {icon && <div className="page-hero-icon">{icon}</div>}
        <h1 className="page-hero-title">{title}</h1>
        {subtitle && <p className="page-hero-subtitle">{subtitle}</p>}
      </Container>
    </div>
  );
}

export default PageHero;
