import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import PitchDeck from './PitchDeck.jsx'

const isPitch = window.location.pathname === '/pitch';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {isPitch ? <PitchDeck /> : <App />}
  </StrictMode>,
)
