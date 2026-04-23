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

function TypingText({ fullText, speed = 80 }) {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      setDisplayed(fullText.slice(0, index + 1));
      index++;

      if (index >= fullText.length) {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [fullText, speed]);

  return <span>{displayed}</span>;
}

function Initial() {
  return (
    <div className="initial-page">
      <div className="content-wrapper">
        <h1 className="hero-title">
          <TypingText fullText="hi, i'm helena :)" speed={100} />
          <span className="cursor">|</span>
        </h1>
        <p className="hero-extra">(pronounced eˈlenɐ)</p>
        <p className="hero-subtitle">
          applied math & computer science student
          <br />
          incoming PhD student at CU Boulder ATOC
          <br />
          <span className="subtitle-emphasis">earth systems enthusiast</span>
        </p>
      </div>
    </div>
  );
}

export default Initial;