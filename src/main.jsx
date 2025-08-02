import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//import './assets/tailwind.css';
import'./index.css'
import App from './App.jsx'
 // <-- IMPORT OBLIGATOIRE pour activer Tailwind


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
