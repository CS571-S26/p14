import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import LocationCard from '../components/LocationCard';
import locations from '../data/locations';
import './HomePage.css';

function HomePage() {
  return (
    <div className="home-page">
      {/* Hero */}
      <section className="hero">
        <div className="hero-overlay" />
        <div className="hero-content">
          <div className="hero-eyebrow">Discover the Wonder</div>
          <h1 className="hero-title">
            Explore the Beauty<br />of <span className="hero-accent">China</span>
          </h1>
          <p className="hero-subtitle">
            From ancient imperial palaces to breathtaking natural landscapes,
            China offers a tapestry of experiences unlike anywhere else on Earth.
            Save the places that call to you, and let the journey begin.
          </p>
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="stat-number">{locations.length}</span>
              <span className="stat-label">Destinations</span>
            </div>
            <div className="stat-sep" />
            <div className="hero-stat">
              <span className="stat-number">5</span>
              <span className="stat-label">UNESCO Sites</span>
            </div>
            <div className="stat-sep" />
            <div className="hero-stat">
              <span className="stat-number">∞</span>
              <span className="stat-label">Memories</span>
            </div>
          </div>
        </div>
      </section>

      {/* Cards grid using React Bootstrap layout */}
      <section className="destinations-section">
        <Container>
          <div className="section-header">
            <h2>Featured Destinations</h2>
            <p>Handpicked wonders waiting for your visit</p>
          </div>
          <Row xs={1} sm={2} lg={4} className="g-4">
            {locations.map(location => (
              <Col key={location.id}>
                <LocationCard location={location} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </div>
  );
}

export default HomePage;
