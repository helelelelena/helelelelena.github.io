/*
  Carousel Component
  
  A simple, elegant image carousel with navigation arrows and indicators.
  
  Props:
  - photos: array of photo objects with id, src, alt, caption
  - title: carousel title
  
  Features:
  - Left/right arrow navigation
  - Dot indicators showing current position
  - Keyboard navigation (arrow keys)
  - Smooth transitions
*/

import { useState, useEffect } from 'react';
import './Carousel.css';

function Carousel({ photos, title }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Navigate to previous photo
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? photos.length - 1 : prevIndex - 1
    );
  };

  // Navigate to next photo
  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === photos.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Jump to specific photo
  const goToIndex = (index) => {
    setCurrentIndex(index);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowLeft') {
        goToPrevious();
      } else if (event.key === 'ArrowRight') {
        goToNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    // Cleanup
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const currentPhoto = photos[currentIndex];

  return (
    <div className="carousel">
      {/* Carousel title */}
      {title && <h2 className="carousel-title">{title}</h2>}
      
      {/* Main carousel container */}
      <div className="carousel-container">
        {/* Previous button */}
        <button 
          className="carousel-button carousel-button-prev"
          onClick={goToPrevious}
          aria-label="Previous photo"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Photo display */}
        <div className="carousel-image-container">
          <img 
            src={currentPhoto.src}
            alt={currentPhoto.alt}
            className="carousel-image"
          />
          {currentPhoto.caption && (
            <p className="carousel-caption">{currentPhoto.caption}</p>
          )}
        </div>

        {/* Next button */}
        <button 
          className="carousel-button carousel-button-next"
          onClick={goToNext}
          aria-label="Next photo"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Dot indicators */}
      <div className="carousel-indicators">
        {photos.map((photo, index) => (
          <button
            key={photo.id}
            className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToIndex(index)}
            aria-label={`Go to photo ${index + 1}`}
          />
        ))}
      </div>

      {/* Counter */}
      <p className="carousel-counter">
        {currentIndex + 1} / {photos.length}
      </p>
    </div>
  );
}

export default Carousel;
