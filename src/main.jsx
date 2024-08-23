import "../../../frontend-microservice/src/bootstrap-custom.css";
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
import {Box} from "@mui/material";

library.add(fas, far, fab);

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Router>
          <Box style={{marginTop: "50px"}}>
              <h1>Tienda virtual</h1>
          </Box>
          <App />
      </Router>
  </StrictMode>,
)
