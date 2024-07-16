import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './config/axios.js'
import { message } from 'antd'

message.config({
  duration: 1,
  maxCount: 1
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
