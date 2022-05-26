import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// Styles
import "bootstrap/dist/css/bootstrap.min.css"
import "./styles/index.css"

// Tell React to leverage on MSAL instances when the app starts
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from './auth/authConfig';

// Tell ReactDOM to use this configuration and MSAL instance
export const msalInstance = new PublicClientApplication(msalConfig);

ReactDOM.render(
  <React.StrictMode>
    <App msalInstance={msalInstance}/>
  </React.StrictMode>,
  document.getElementById('root')
);
