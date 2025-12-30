/*
  App Component - Main Application Router
  
  This is the root component of our application.
  It sets up routing using React Router and wraps pages with the Layout component.
  Now includes theme management for dark mode support!
  
  React Router concepts:
  - BrowserRouter: Enables client-side routing
  - Routes: Container for all route definitions
  - Route: Maps a URL path to a component
  
  React Hooks used:
  - useState: Manages theme state (light/dark)
  - useEffect: Applies theme on mount and saves preference
*/

import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Initial from './pages/Initial';
import About from './pages/About';
import Research from './pages/Research';
import CV from './pages/CV';
import Photos from './pages/Photos';

function App() {
  /*
    Theme State Management
    
    useState creates a state variable that triggers re-renders when changed
    The initial value comes from localStorage (saved preference) or defaults to 'light'
    
    Why () => {...}? This is "lazy initialization" - the function only runs once
    on mount, not on every render. Useful when reading from localStorage.
  */
  const [theme, setTheme] = useState(() => {
    // Check if user has a saved preference
    const savedTheme = localStorage.getItem('theme');
    // If saved preference exists, use it; otherwise default to 'light'
    return savedTheme || 'light';
  });

  /*
    useEffect Hook - Side Effects
    
    Runs after the component renders. Here it:
    1. Applies the theme to the document
    2. Saves the preference to localStorage
    
    [theme] dependency array means: run this whenever 'theme' changes
  */
  useEffect(() => {
    // Apply theme to root element
    document.documentElement.setAttribute('data-theme', theme);
    
    // Save preference to localStorage so it persists across sessions
    localStorage.setItem('theme', theme);
  }, [theme]);

  /*
    Theme Toggle Function
    
    Passed down to child components via props
    Switches between 'light' and 'dark'
  */
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <Router>
      {/* 
        Layout wraps all pages and receives theme props
        This allows Header to show the theme toggle button
      */}
      <Layout theme={theme} toggleTheme={toggleTheme}>
        <Routes>
          {/* Define routes: path → component */}
          <Route path="/" element={<Initial />} />
          <Route path="/about" element={<About />} />
          <Route path="/research" element={<Research />} />
          <Route path="/cv" element={<CV />} />
          <Route path="/photos" element={<Photos />} />
          
          {/* 
            Optional: Add a 404 Not Found page
            The * path matches any route not defined above
          */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

