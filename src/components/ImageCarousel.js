import React, { useState, useEffect, useCallback } from 'react';
import './ImageCarousel.css';

function ImageCarousel({ images }) {
  const [current, setCurrent] = useState(0);

  // Reset when images array changes (new location)
  useEffect(() => {
    setCurrent(0);
  }, [images]);

  const next = useCallback(() => {
    setCurrent(c => (c + 1) % images.length);
  }, [images.length]);

  const prev = () => {
    setCurrent(c => (c - 1 + images.length) % images.length);
  };

  // Auto-advance every 4 seconds
  useEffect(() => {
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <div className="carousel">
      <div
        className="carousel-track"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((src, i) => (
          <div key={i} className="carousel-slide">
            <img src={src} alt={`View ${i + 1}`} />
          </div>
        ))}
      </div>

      <button className="carousel-btn carousel-prev" onClick={prev} aria-label="Previous">
        &#8249;
      </button>
      <button className="carousel-btn carousel-next" onClick={next} aria-label="Next">
        &#8250;
      </button>

      <div className="carousel-dots">
        {images.map((_, i) => (
          <button
            key={i}
            className={`carousel-dot ${i === current ? 'active' : ''}`}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      <div className="carousel-counter">{current + 1} / {images.length}</div>
    </div>
  );
}

export default ImageCarousel;
