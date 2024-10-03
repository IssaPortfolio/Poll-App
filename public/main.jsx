import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '../src/App.jsx'

// Renders the main React app into the root DOM element
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
