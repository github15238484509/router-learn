import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./react-router/matchPath"
// import "./react-router/history"
import "./router"
import {BrowserRouter} from "react-router-dom"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
