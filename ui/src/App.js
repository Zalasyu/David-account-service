import { BrowserRouter, Route, Redirect, Switch, Routes } from 'react-router-dom'

import Dashboard from './views/Dashboard'

import ArtistNear from './views/VenueSidebar/ArtistNear'
import Events from './views/VenueSidebar/Events'
import EventsNear from './views/VenueSidebar/EventsNear'
import FansNear from './views/VenueSidebar/FansNear'
import Support from './views/VenueSidebar/Support'



function App() {

  return (
    <BrowserRouter>
     
        <Switch>
        <Redirect from="/" to="/dashboard" exact />
        <Route path='/dashboard' component={Dashboard} />

         {/* routes for the sidebar */}
          <Route path="/artistnearyou" component={ArtistNear } />
          <Route path="/events" component={Events } />
          <Route path="/eventsnearyou" component={EventsNear} />
          <Route path="/fansnearyou" component={FansNear } />
          <Route path="/support" component={Support} />
         
        </Switch>
        
   
   
    </BrowserRouter>

  );
}

export default App;
