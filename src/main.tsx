import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import PumaPage from './PumaPage.tsx'

// Minimal path routing for the test pages (no router dependency).
const Page = window.location.pathname === '/puma' ? PumaPage : App

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Page />
  </StrictMode>,
)
