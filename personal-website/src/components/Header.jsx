/*
  Header Component
  
  The navigation header that appears at the top of every page.
  Contains the site logo/name, navigation links, and theme toggle.
  
  Key concepts:
  - NavLink from react-router-dom provides active link styling
  - The 'nav' element is semantic HTML for navigation sections
  - Theme toggle button allows switching between light/dark mode
*/

import { NavLink } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import './Header.css';

function Header({ theme, toggleTheme }) {
  return (
    <header className="header">
      <div className="header-container">
        {/* Site branding - could be a logo or just text */}
        <div className="header-brand">
          <NavLink to="/" className="brand-link">
            helena
          </NavLink>
        </div>

        {/* Right side: Navigation + Theme Toggle */}
        <div className="header-right">
          {/* Navigation menu */}
          <nav className="nav">
            <ul className="nav-list">
              <li>
                {/* 
                  NavLink automatically adds "active" class to the current page
                  This allows us to style the active link differently
                */}
                <NavLink 
                  to="/about" 
                  className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                >
                  about
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/research" 
                  className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                >
                  research
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/cv" 
                  className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                >
                  cv
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/photos" 
                  className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                >
                  film photos
                </NavLink>
              </li>
            </ul>
          </nav>

          {/* Theme toggle button */}
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </div>
      </div>
    </header>
  );
}

export default Header;
