// Description: The implementation of MsalProvider
// All children wll have access to @azure/msal-react context, hooks, and components

// In-Built Libraries
import { Route, Switch, Router } from 'react-router-dom'
import React from "react";

// Third-Party Libraries
import { MsalProvider } from "@azure/msal-react";

// Views/Pages
import { Dashboard } from './views/Dashboard';
import { Homepage } from './views/Homepage';

import "./styles/App.css";

const Views = () => {
  return (
    <Switch>
      <Route path='/' exact>
        <Homepage />
      </Route>
      <Route path="/dashboard">
        <Dashboard /> 
      </Route>
    </Switch>
  )
}


/**
 * msal-react is built on the React context API and all parts of our
 * app that require authentication must be wrapped in the MsalProvider
 * component.
 * We will first need to initialize an instance of PublicClientApplication
 * then pass this to MsalProvider as a prop.
 * 
 * All components underneath MsalProvider will have access to the 
 * PublicClientApplication instance via context as well as hooks and components
 * provided by msal-react 
 */
const App = ({ pca }) => {
  return (
    <Router>
      <MsalProvider instance={pca}>
        <Views />
      </MsalProvider>
    </Router>
  )
}

export default App;
