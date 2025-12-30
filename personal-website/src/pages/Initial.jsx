/* 
  Initial page
  This is the landing page of the website. 
  It simply says "hi, i'm helena :)" and a short subtitle.
  It also gives the correct pronunciation for Helena: eˈlenɐ.
  The user is then expected to navigate to other pages for more info.
  
  Features a typing animation effect for an engaging first impression.
*/

import { useState, useEffect } from 'react';
import './Initial.css';

function Initial() {
  const [displayedText, setDisplayedText] = useState('');
  const fullText = "hi, i'm helena :)";
  const typingSpeed = 100; // milliseconds per character

  useEffect(() => {
    let currentIndex = 0;
    
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, typingSpeed);

    // Cleanup function
    return () => clearInterval(typingInterval);
  }, []);

  return (
    <div className="initial-page">
      <div className="content-wrapper">
        <h1 className="hero-title">
          {displayedText}
          <span className="cursor">|</span>
        </h1>
        <p className="hero-extra">(pronounced eˈlenɐ)</p>
        <p className="hero-subtitle">
          applied math & computer science student
          <br />
          <span className="subtitle-emphasis">earth systems enthusiast 🌎</span>
        </p>
      </div>
    </div>
  );
}

export default Initial;