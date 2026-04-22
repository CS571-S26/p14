import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import LocationCard from '../components/LocationCard';
import PageHero from '../components/PageHero';
import locations from '../data/locations';
import './SavedPage.css';

function SavedPage() {
  const { saved } = useApp();
  const navigate = useNavigate();
  const savedLocations = locations.filter(l => !!saved[l.id]);

  return (
    <div className="saved-page">
      <PageHero
        icon="🔖"
        title="Your Saved Places"
        subtitle="Your personal China travel wishlist — ready whenever you are"
      />

      <div className="saved-content">
        <Container>
          {savedLocations.length === 0 ? (
            <div className="empty-state">
              <div className="empty-illustration">🏯</div>
              <h2>No saved places yet</h2>
              <p>
                Browse our destinations and click <strong>Save</strong> on any place that inspires you.
                They'll all appear here for easy reference.
              </p>
              <Button variant="danger" onClick={() => navigate('/')}>
                Explore Destinations
              </Button>
            </div>
          ) : (
            <>
              <div className="saved-count-row">
                <span className="saved-count">
                  {savedLocations.length} destination{savedLocations.length !== 1 ? 's' : ''} saved
                </span>
              </div>
              <Row xs={1} sm={2} lg={4} className="g-4">
                {savedLocations.map(location => (
                  <Col key={location.id}>
                    <LocationCard location={location} />
                  </Col>
                ))}
              </Row>
            </>
          )}
        </Container>
      </div>
    </div>
  );
}

export default SavedPage;
