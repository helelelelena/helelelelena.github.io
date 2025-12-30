/*
  Footer Component
  
  Simple footer that appears at the bottom of every page.
  Contains copyright info and optional links to social media or contact.
  
  The footer receives 'year' as a prop to avoid hardcoding the copyright year.
*/

import './Footer.css';

function Footer() {
  // Get current year dynamically for copyright
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Copyright notice */}
        <p className="footer-text">
          © {currentYear} Helena. All rights reserved.
        </p>
        
        {/* 
          Optional: Social links section
          Uncomment and customize when you want to add social media links
        */}
        {/* 
        <div className="footer-links">
          <a href="https://github.com/yourusername" 
             target="_blank" 
             rel="noopener noreferrer"
             aria-label="GitHub">
            GitHub
          </a>
          <a href="https://linkedin.com/in/yourprofile" 
             target="_blank" 
             rel="noopener noreferrer"
             aria-label="LinkedIn">
            LinkedIn
          </a>
          <a href="mailto:your.email@example.com"
             aria-label="Email">
            Email
          </a>
        </div>
        */}
      </div>
    </footer>
  );
}

export default Footer;
