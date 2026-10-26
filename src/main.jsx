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

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
