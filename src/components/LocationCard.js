import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import './LocationCard.css';

function LocationCard({ location }) {
  const navigate = useNavigate();
  const { getLikeCount, isLiked, toggleLike, saved, toggleSave } = useApp();
  
  const likeCount = getLikeCount(location.id);
  const liked = isLiked(location.id);
  const isSaved = !!saved[location.id];

  const goToDetail = () => navigate(`/location/${location.id}`);

  return (
    <Card className="location-card h-100" onClick={goToDetail} style={{ cursor: 'pointer' }}>
      <div className="card-image">
        <Card.Img variant="top" src={location.images[0]} alt={location.name} loading="lazy" />
        <Badge className="card-category" bg="danger">{location.category}</Badge>
      </div>

      <Card.Body className="d-flex flex-column">
        <div className="card-title-row mb-1">
          <Card.Title as="h3" className="card-name mb-0">{location.name}</Card.Title>
          <span className="card-chinese">{location.chineseName}</span>
        </div>
        <p className="card-location">
          <span className="pin-icon">📍</span>
          {location.location}
        </p>
        <Card.Text className="card-intro flex-grow-1">
          {location.introduction.substring(0, 118)}…
        </Card.Text>

        <div className="card-actions mt-auto" onClick={(e) => e.stopPropagation()}>
          <Button
            variant={liked ? 'danger' : 'outline-secondary'}
            size="sm"
            className="card-btn like-btn"
            onClick={() => toggleLike(location.id)}
            title={liked ? 'Unlike' : 'Like'}
          >
            {liked ? '❤️' : '🤍'} {likeCount.toLocaleString()}
          </Button>

          <Button
            variant={isSaved ? 'warning' : 'outline-secondary'}
            size="sm"
            className="card-btn save-btn"
            onClick={() => toggleSave(location.id)}
            title={isSaved ? 'Unsave' : 'Save'}
          >
            {isSaved ? '🔖 Saved' : '📌 Save'}
          </Button>

          <Button
            variant="outline-danger"
            size="sm"
            className="card-btn explore-btn"
            onClick={goToDetail}
          >
            Explore →
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default LocationCard;