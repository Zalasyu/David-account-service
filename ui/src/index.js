// Description: This is the initialization of the PublicClientApplication
// It is then passed to App.jsx

// In-Built imports
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';

// Styles
import "./styles/index.css"

// MSAL Imports
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from './auth/authConfig';

// Tell ReactDOM to use this configuration and MSAL instance
export const msalInstance = new PublicClientApplication(msalConfig);


ReactDOM.render(
  <React.StrictMode>
    <App pca={msalInstance} />
  </React.StrictMode>, 
  document.getElementById('root')
  );
