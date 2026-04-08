import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import './LocationCard.css';

function LocationCard({ location }) {
  const navigate = useNavigate();
  const { liked, saved, toggleLike, toggleSave } = useApp();
  const isLiked = !!liked[location.id];
  const isSaved = !!saved[location.id];
  const likeCount = location.baseLikes + (isLiked ? 1 : 0);

  const handleCardClick = () => navigate(`/location/${location.id}`);

  const stopAndRun = (fn) => (e) => {
    e.stopPropagation();
    fn();
  };

  return (
    <div className="location-card" onClick={handleCardClick}>
      <div className="card-image">
        <img src={location.images[0]} alt={location.name} loading="lazy" />
        <div className="card-category">{location.category}</div>
      </div>

      <div className="card-body">
        <div className="card-title-row">
          <h3 className="card-name">{location.name}</h3>
          <span className="card-chinese">{location.chineseName}</span>
        </div>
        <p className="card-location">
          <span className="pin-icon">📍</span>
          {location.location}
        </p>
        <p className="card-intro">
          {location.introduction.substring(0, 118)}…
        </p>

        <div className="card-actions" onClick={e => e.stopPropagation()}>
          <button
            className={`card-btn like-btn ${isLiked ? 'liked' : ''}`}
            onClick={stopAndRun(() => toggleLike(location.id))}
            title={isLiked ? 'Unlike' : 'Like'}
          >
            {isLiked ? '❤️' : '🤍'} {likeCount.toLocaleString()}
          </button>

          <button
            className={`card-btn save-btn ${isSaved ? 'saved' : ''}`}
            onClick={stopAndRun(() => toggleSave(location.id))}
            title={isSaved ? 'Unsave' : 'Save'}
          >
            {isSaved ? '🔖 Saved' : '📌 Save'}
          </button>

          <button
            className="card-btn explore-btn"
            onClick={stopAndRun(handleCardClick)}
          >
            Explore →
          </button>
        </div>
      </div>
    </div>
  );
}

export default LocationCard;
