/*
  Main Entry Point
  
  This is where React gets mounted to the DOM.
  It imports global styles and renders the App component.
  
  StrictMode: A development tool that helps catch potential problems
  - Detects unsafe lifecycle methods
  - Warns about deprecated APIs
  - Helps identify side effects
*/

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'  // Import our global styles
import App from './App.jsx'

// GitHub Pages serves 404.html for client-side routes. Restore the original
// path before BrowserRouter reads the URL so direct links render normally.
const redirectPath = new URLSearchParams(window.location.search).get('redirect');
if (redirectPath?.startsWith('/')) {
  window.history.replaceState(null, '', redirectPath);
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
