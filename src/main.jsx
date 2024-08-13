import "./bootstrap-custom.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";

import { HashRouter as Router } from "react-router-dom";

library.add(fas, far, fab);

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Router>
          <h1>Prueba</h1>
          <App />
      </Router>
  </StrictMode>,
)
