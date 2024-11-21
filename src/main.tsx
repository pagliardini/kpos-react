import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Navbar from './Nav.tsx'

createRoot(document.getElementById('root')!).render(
<StrictMode>
  <div>
    <Navbar />
  </div>
  <App />
</StrictMode>
)
