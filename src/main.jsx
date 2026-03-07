import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

console.log("Attempting to load App.jsx...");

Promise.all([
  import('./App.jsx'),
  import('./PitchDeck.jsx')
]).then(([AppModule, PitchDeckModule]) => {
  console.log("Modules loaded successfully!");
  const App = AppModule.default;
  const PitchDeck = PitchDeckModule.default;
  const isPitch = window.location.pathname === '/pitch';

  createRoot(document.getElementById('root')).render(
    <StrictMode>
      {isPitch ? <PitchDeck /> : <App />}

    </StrictMode>,
  )
}).catch(e => {
  console.error("FATAL IMPORT MODULE ERROR:", e);
  document.getElementById('root').innerHTML = `<div style="color:red; font-family:sans-serif; padding: 20px;">
    <h1>Fatal Module Load Error</h1>
    <pre>${e.stack || e}</pre>
  </div>`;
});
