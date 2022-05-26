import { BrowserRouter, Route, Redirect, Switch, Routes, Router } from 'react-router-dom'

import { MsalProvider } from "@azure/msal-react";

import { PageLayout } from "./components/PageLayout.jsx";

import Dashboard from './views/Dashboard';
import Profile from './views/Profile'
import VenueSideBar from './components/VenueSidebar'
import ArtistNear from './views/VenueSidebar/ArtistNear'
import Events from './views/VenueSidebar/Events'
import EventsNear from './views/VenueSidebar/EventsNear'
import FansNear from './views/VenueSidebar/FansNear'
import Support from './views/VenueSidebar/Support'

const Views = () => {
  return (
    <Switch>
      <Route path="/dashboard">
        <Dashboard />
      </Route>
      <Route path="/profile">
        <Profile />
      </Route>
    </Switch>
  )



}

/**
 * msal-react is buil on the React context API and all parts of our
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
