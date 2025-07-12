// src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'      // phải có file App.jsx
// không cần import index.css nữa

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
