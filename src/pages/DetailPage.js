import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Button, Badge } from 'react-bootstrap';
import ImageCarousel from '../components/ImageCarousel';
import { useApp } from '../context/AppContext';
import { useComments } from '../hooks/useComments';
import { getOrCreateUsername } from '../utils/username';
import locations from '../data/locations';
import './DetailPage.css';

function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getLikeCount, isLiked, toggleLike, saved, toggleSave } = useApp();

  const currentIndex = locations.findIndex(l => l.id === parseInt(id));
  const location = locations[currentIndex];

  const { comments, loading: commentsLoading, error: commentsError, addComment, deleteComment } = useComments(location?.id);

  const [username, setUsername] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [commentError, setCommentError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    getOrCreateUsername().then(setUsername);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCommentText('');
    setCommentError('');
  }, [id]);

  if (!location) {
    return (
      <Container className="not-found text-center py-5">
        <h2>Location not found</h2>
        <Button variant="danger" onClick={() => navigate('/')}>Return to Home</Button>
      </Container>
    );
  }

  const likeCount = getLikeCount(location.id);
  const liked = isLiked(location.id);
  const isSaved = saved[location.id];
  const prevLocation = currentIndex > 0 ? locations[currentIndex - 1] : null;
  const nextLocation = currentIndex < locations.length - 1 ? locations[currentIndex + 1] : null;

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) {
      setCommentError('Please enter a comment.');
      return;
    }
    if (!username) return;
    setSubmitting(true);
    try {
      await addComment(username, commentText.trim());
      setCommentText('');
      setCommentError('');
    } catch {
      setCommentError('Failed to post comment. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (window.confirm('Delete your comment?')) {
      await deleteComment(commentId);
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'just now';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });
  };

  return (
    <div className="detail-page">
      <div className="detail-container">

        <div className="detail-header">
          <div className="detail-title-row">
            <h1 className="detail-name">{location.name}</h1>
            <span className="detail-chinese">{location.chineseName}</span>
          </div>
          <div className="detail-meta">
            <Badge bg="danger" className="detail-category-tag">{location.category}</Badge>
            <span className="detail-province">📍 {location.province}</span>
          </div>
        </div>

        <ImageCarousel images={location.images} key={location.id} />

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
              <Button
                variant={liked ? 'danger' : 'outline-danger'}
                className="sidebar-btn like-btn w-100"
                onClick={() => toggleLike(location.id)}
              >
                <span className="btn-emoji">{liked ? '❤️' : '🤍'}</span>
                <span className="btn-label">{liked ? 'Liked' : 'Like'}</span>
                <span className="like-pill">{likeCount.toLocaleString()}</span>
              </Button>

              <Button
                variant={isSaved ? 'warning' : 'outline-warning'}
                className="sidebar-btn save-btn w-100"
                onClick={() => toggleSave(location.id)}
              >
                <span className="btn-emoji">{isSaved ? '🔖' : '📌'}</span>
                <span className="btn-label">{isSaved ? 'Saved to List' : 'Save for Later'}</span>
              </Button>
            </div>
          </aside>
        </div>

        <nav className="place-navigation">
          <Button
            variant="outline-secondary"
            className="place-nav-btn prev-place"
            onClick={() => prevLocation && navigate(`/location/${prevLocation.id}`)}
            disabled={!prevLocation}
          >
            <span className="nav-arrow">←</span>
            <span className="nav-place-name">{prevLocation ? prevLocation.name : 'No previous'}</span>
          </Button>

          <Button variant="danger" className="place-nav-btn home-place" onClick={() => navigate('/')}>
            🏠 Home
          </Button>

          <Button
            variant="outline-secondary"
            className="place-nav-btn next-place"
            onClick={() => nextLocation && navigate(`/location/${nextLocation.id}`)}
            disabled={!nextLocation}
          >
            <span className="nav-place-name">{nextLocation ? nextLocation.name : 'No next'}</span>
            <span className="nav-arrow">→</span>
          </Button>
        </nav>

        <section className="comments-section">
          <h2 className="comments-title">
            Community Comments
            <span className="comment-count-badge">{comments.length}</span>
          </h2>

          <form className="comment-form" onSubmit={handleSubmitComment}>
            <div className="username-display">
              {username
                ? <><span className="username-label">Posting as</span> <span className="username-value">{username}</span></>
                : <span className="username-label">Generating your username…</span>
              }
            </div>
            <label htmlFor="comment-text" className="visually-hidden">Your comment</label>
            <textarea
              id="comment-text"
              placeholder={`Share your thoughts about ${location.name}…`}
              value={commentText}
              onChange={e => setCommentText(e.target.value)}
              className="comment-textarea"
              rows={4}
              maxLength={500}
            />
            {commentError && <p className="comment-error">{commentError}</p>}
            <Button
              type="submit"
              variant="danger"
              className="submit-comment-btn"
              disabled={submitting || !username}
            >
              {submitting ? 'Posting…' : 'Post Comment'}
            </Button>
          </form>

          <div className="comments-list">
            {commentsError && (
              <div className="no-comments"><p>{commentsError}</p></div>
            )}
            {!commentsError && !commentsLoading && comments.length === 0 && (
              <div className="no-comments">
                <p>Be the first to leave a comment about {location.name}!</p>
              </div>
            )}
            {!commentsError && comments.map(comment => (
              <div key={comment.id} className="comment-card">
                <div className="comment-header">
                  <div className="comment-avatar">
                    {comment.username.charAt(0).toUpperCase()}
                  </div>
                  <div className="comment-meta">
                    <span className="comment-author">{comment.username}</span>
                    <span className="comment-time">{formatDate(comment.timestamp)}</span>
                  </div>
                  {comment.isOwner && (
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteComment(comment.id)}
                      title="Delete your comment"
                    >
                      🗑️
                    </button>
                  )}
                </div>
                <p className="comment-text">{comment.text}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}

export default DetailPage;