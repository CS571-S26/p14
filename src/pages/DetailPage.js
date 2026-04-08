import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ImageCarousel from '../components/ImageCarousel';
import { useApp } from '../context/AppContext';
import locations from '../data/locations';
import './DetailPage.css';

function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { liked, saved, comments, toggleLike, toggleSave, addComment, deleteComment, isMyComment } = useApp();

  const currentIndex = locations.findIndex(l => l.id === parseInt(id));
  const location = locations[currentIndex];

  const [authorName, setAuthorName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [commentError, setCommentError] = useState('');

  // Scroll to top and reset form on location change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setAuthorName('');
    setCommentText('');
    setCommentError('');
  }, [id]);

  if (!location) {
    return (
      <div className="not-found">
        <h2>Location not found</h2>
        <button className="home-link-btn" onClick={() => navigate('/')}>Return to Home</button>
      </div>
    );
  }

  const isLiked = !!liked[location.id];
  const isSaved = !!saved[location.id];
  const likeCount = location.baseLikes + (isLiked ? 1 : 0);
  const locationComments = comments[location.id] || [];

  const prevLocation = currentIndex > 0 ? locations[currentIndex - 1] : null;
  const nextLocation = currentIndex < locations.length - 1 ? locations[currentIndex + 1] : null;

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (!authorName.trim()) {
      setCommentError('Please enter your name.');
      return;
    }
    if (!commentText.trim()) {
      setCommentError('Please enter a comment.');
      return;
    }
    addComment(location.id, authorName.trim(), commentText.trim());
    setCommentText('');
    setCommentError('');
  };

  const formatDate = (iso) =>
    new Date(iso).toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });

  return (
    <div className="detail-page">
      <div className="detail-container">

        {/* Header */}
        <div className="detail-header">
          <div className="detail-title-row">
            <h1 className="detail-name">{location.name}</h1>
            <span className="detail-chinese">{location.chineseName}</span>
          </div>
          <div className="detail-meta">
            <span className="detail-category-tag">{location.category}</span>
            <span className="detail-province">📍 {location.province}</span>
          </div>
        </div>

        {/* Carousel */}
        <ImageCarousel images={location.images} key={location.id} />

        {/* Main content + sidebar */}
        <div className="detail-body">
          <div className="detail-main">
            <blockquote className="detail-tagline">"{location.tagline}"</blockquote>

            <h2 className="section-title">About This Destination</h2>
            <p className="detail-intro">{location.introduction}</p>

            <h3 className="highlights-title">Highlights</h3>
            <ul className="highlights-list">
              {location.highlights.map((h, i) => (
                <li key={i}>
                  <span className="highlight-dot" />
                  {h}
                </li>
              ))}
            </ul>
          </div>

          <aside className="detail-sidebar">
            <div className="sidebar-location-card">
              <p className="sidebar-label">Location</p>
              <p className="sidebar-location-name">{location.location}</p>
              <p className="sidebar-province">{location.province}</p>
            </div>

            <div className="sidebar-actions">
              <button
                className={`sidebar-btn like-btn ${isLiked ? 'active' : ''}`}
                onClick={() => toggleLike(location.id)}
              >
                <span className="btn-emoji">{isLiked ? '❤️' : '🤍'}</span>
                <span className="btn-label">{isLiked ? 'Liked' : 'Like'}</span>
                <span className="like-pill">{likeCount.toLocaleString()}</span>
              </button>

              <button
                className={`sidebar-btn save-btn ${isSaved ? 'active' : ''}`}
                onClick={() => toggleSave(location.id)}
              >
                <span className="btn-emoji">{isSaved ? '🔖' : '📌'}</span>
                <span className="btn-label">{isSaved ? 'Saved to List' : 'Save for Later'}</span>
              </button>
            </div>
          </aside>
        </div>

        {/* Navigation */}
        <nav className="place-navigation">
          <button
            className="place-nav-btn prev-place"
            onClick={() => prevLocation && navigate(`/location/${prevLocation.id}`)}
            disabled={!prevLocation}
          >
            <span className="nav-arrow">←</span>
            <span className="nav-place-name">{prevLocation ? prevLocation.name : 'No previous'}</span>
          </button>

          <button className="place-nav-btn home-place" onClick={() => navigate('/')}>
            🏠 Home
          </button>

          <button
            className="place-nav-btn next-place"
            onClick={() => nextLocation && navigate(`/location/${nextLocation.id}`)}
            disabled={!nextLocation}
          >
            <span className="nav-place-name">{nextLocation ? nextLocation.name : 'No next'}</span>
            <span className="nav-arrow">→</span>
          </button>
        </nav>

        {/* Comments */}
        <section className="comments-section">
          <h2 className="comments-title">
            Community Comments
            <span className="comment-count-badge">{locationComments.length}</span>
          </h2>

          {/* Comment form */}
          <form className="comment-form" onSubmit={handleSubmitComment}>
            <input
              type="text"
              placeholder="Your name"
              value={authorName}
              onChange={e => setAuthorName(e.target.value)}
              className="comment-input"
              maxLength={50}
            />
            <textarea
              placeholder={`Share your thoughts about ${location.name}…`}
              value={commentText}
              onChange={e => setCommentText(e.target.value)}
              className="comment-textarea"
              rows={4}
              maxLength={500}
            />
            {commentError && <p className="comment-error">{commentError}</p>}
            <button type="submit" className="submit-comment-btn">Post Comment</button>
          </form>

          {/* Comment list */}
          <div className="comments-list">
            {locationComments.length === 0 ? (
              <div className="no-comments">
                <p>Be the first to leave a comment about {location.name}!</p>
              </div>
            ) : (
              [...locationComments].reverse().map(comment => (
                <div key={comment.id} className="comment-card">
                  <div className="comment-header">
                    <div className="comment-avatar">
                      {comment.author.charAt(0).toUpperCase()}
                    </div>
                    <div className="comment-meta">
                      <span className="comment-author">{comment.author}</span>
                      <span className="comment-time">{formatDate(comment.timestamp)}</span>
                    </div>
                    {isMyComment(comment.id) && (
                      <button
                        className="delete-btn"
                        onClick={() => deleteComment(location.id, comment.id)}
                        title="Delete your comment"
                      >
                        🗑️
                      </button>
                    )}
                  </div>
                  <p className="comment-text">{comment.text}</p>
                </div>
              ))
            )}
          </div>
        </section>

      </div>
    </div>
  );
}

export default DetailPage;
