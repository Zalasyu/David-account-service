import { BrowserRouter, Route, Redirect, Switch, Routes, Router } from 'react-router-dom'
import React, { useEffect } from "react";

import { MsalProvider, useMsal } from "@azure/msal-react";
import { EventType, InteractionType } from "@azure/msal-browser"

import { PageLayout } from "./components/PageLayout.jsx";
import { b2cPolicies } from "./auth/authConfig";

import { Dashboard } from './views/Dashboard';
import { Hello } from './views/Hello'

import VenueSideBar from './components/VenueSidebar'
import ArtistNear from './views/VenueSidebar/ArtistNear'
import Events from './views/VenueSidebar/Events'
import EventsNear from './views/VenueSidebar/EventsNear'
import FansNear from './views/VenueSidebar/FansNear'
import Support from './views/VenueSidebar/Support'

import "./styles/App.css";

const Views = () => {

  /**
   * useMsal is hook that returns the PublicClientApplication instance, 
   * an array of all accounts currently signed in and an inProgress value 
   * that tells you what msal is currently doing. For more, visit:
   * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-react/docs/hooks.md
   */
  const { instance } = useMsal();

  /**
   * Using the event API, you can register an event callback that will do something when an event is emitted. 
   * When registering an event callback in a react component you will need to make sure you do 2 things.
   * 1) The callback is registered only once
   * 2) The callback is unregistered before the component unmounts.
   * For more, visit: https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-react/docs/events.md
   */
  useEffect(() => {
    const callbackId = instance.addEventCallback((event) => {
      if (event.eventType === EventType.LOGIN_FAILURE) {
        if (event.error && event.error.errorMessage.indexOf("AADB2C90118") > -1) {
          if (event.interactionType === InteractionType.Redirect) {
            instance.loginRedirect(b2cPolicies.authorities.forgotPassword);
          } else if (event.interactionType === InteractionType.Popup) {
            instance.loginPopup(b2cPolicies.authorities.forgotPassword)
              .catch(e => {
                return;
              });
          }
        }
      }

      if (event.eventType === EventType.LOGIN_SUCCESS || event.eventType === EventType.ACQUIRE_TOKEN_SUCCESS) {
        if (event?.payload) {
          /**
           * We need to reject id tokens that were not issued with the default sign-in policy.
           * "acr" claim in the token tells us what policy is used (NOTE: for new policies (v2.0), use "tfp" instead of "acr").
           * To learn more about B2C tokens, visit https://docs.microsoft.com/en-us/azure/active-directory-b2c/tokens-overview
           */
          if (event.payload.idTokenClaims["acr"] === b2cPolicies.names.forgotPassword) {
            window.alert("Password has been reset successfully. \nPlease sign-in with your new password.");
            return instance.logout();
          } else if (event.payload.idTokenClaims["acr"] === b2cPolicies.names.editProfile) {
            window.alert("Profile has been edited successfully. \nPlease sign-in again.");
            return instance.logout();
          }
        }
      }
    });

    return () => {
      if (callbackId) {
        instance.removeEventCallback(callbackId);
      }
    };
  }, []);

  return (
    <Switch>
      <Route path="/dashboard">
        <Hello /> 
      </Route>
    </Switch>
  )
}


/**
 * msal-react is built on the React context API and all parts of our
 * app that require authentication must be wrapper in the MsalProvider
 * component.
 * We will first need to initialize an instance of PublicClientApplication
 * then pass this to MsalProvider as a prop.
 * 
 * All components underneath MsalProvider will have access to the 
 * PublicClientApplication instance via context as well as hooks and components
 * provided by msal-react 
 */
const App = ({ instance }) => {
  return (
    <Router>
      <MsalProvider instance={instance}>
        <PageLayout>
          <Views />
        </PageLayout>
      </MsalProvider>
    </Router>
  )
}

export default App;
