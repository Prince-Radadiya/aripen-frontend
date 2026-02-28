import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext.js'
import {AppWrapper} from './Components/common/PageMeta.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
       <AppWrapper>
        <App />
      </AppWrapper>
    </ThemeProvider>
  </StrictMode>,
)
