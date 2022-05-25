import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
