import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './i18n'
import App from './App.tsx'

// Console branding
console.log(
  '%cCODEPOETS',
  'color: #3b82f6; font-size: 28px; font-weight: bold;'
);
console.log(
  '%cDesigned & Developed by CodePoets',
  'color: #60a5fa; font-size: 12px;'
);
console.log(
  '%cHey! You shouldn\'t be here...',
  'color: #f59e0b; font-size: 11px; font-style: italic;'
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
