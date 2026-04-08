import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import LocationCard from '../components/LocationCard';
import locations from '../data/locations';
import './SavedPage.css';

function SavedPage() {
  const { saved } = useApp();
  const navigate = useNavigate();
  const savedLocations = locations.filter(l => !!saved[l.id]);

  return (
    <div className="saved-page">
      <div className="saved-hero">
        <div className="saved-hero-icon">🔖</div>
        <h1>Your Saved Places</h1>
        <p>Your personal China travel wishlist — ready whenever you are</p>
      </div>

      <div className="saved-content">
        {savedLocations.length === 0 ? (
          <div className="empty-state">
            <div className="empty-illustration">🏯</div>
            <h2>No saved places yet</h2>
            <p>
              Browse our destinations and click <strong>Save</strong> on any place that inspires you.
              They'll all appear here for easy reference.
            </p>
            <button className="browse-btn" onClick={() => navigate('/')}>
              Explore Destinations
            </button>
          </div>
        ) : (
          <>
            <div className="saved-count-row">
              <span className="saved-count">
                {savedLocations.length} destination{savedLocations.length !== 1 ? 's' : ''} saved
              </span>
            </div>
            <div className="saved-grid">
              {savedLocations.map(location => (
                <LocationCard key={location.id} location={location} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default SavedPage;
