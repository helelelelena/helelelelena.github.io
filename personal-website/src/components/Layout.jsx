/*
  Layout Component
  
  This is a wrapper component that provides consistent structure to all pages.
  It includes the Header and Footer, and renders page-specific content in between.
  Now also handles passing theme props to child components.
  
  Key React concept: Props & Hooks
  - 'children' represents whatever is nested inside this component
  - 'theme' and 'toggleTheme' are passed down from App
  - useLocation hook tells us which page we're on
  - We apply different styling for the Initial (landing) page
*/

import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import './Layout.css';

function Layout({ children, theme, toggleTheme }) {
  // Get current location to determine which page we're on
  const location = useLocation();
  
  // Check if we're on the initial/landing page
  const isInitialPage = location.pathname === '/';
  
  return (
    <div className="layout">
      {/* Header receives theme props to display toggle button */}
      <Header theme={theme} toggleTheme={toggleTheme} />
      
      {/* 
        Main content area - applies different class for Initial page
        Initial page gets full-screen treatment, other pages get normal padding
      */}
      <main className={isInitialPage ? "main-content-fullscreen" : "main-content"}>
        {/* 
          {children} renders whatever component is passed to Layout
          This makes Layout reusable for all pages
        */}
        {children}
      </main>
      
      {/* Footer appears on every page */}
      <Footer />
    </div>
  );
}

export default Layout;
