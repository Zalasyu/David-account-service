import { BrowserRouter, Route, Redirect, Switch, Routes } from 'react-router-dom'

import Dashboard from './views/Dashboard'
import Login from './views/Login'
import SignUp from './views/SignUp'
import VenueSideBar from './components/VenueSidebar'
import ArtistNear from './views/VenueSidebar/ArtistNear'
import Events from './views/VenueSidebar/Events'
import EventsNear from './views/VenueSidebar/EventsNear'
import FansNear from './views/VenueSidebar/FansNear'
import Support from './views/VenueSidebar/Support'



function App() {

  return (
    <BrowserRouter>
      {/* routes for the sidebar */}
        <Switch>
        <Route path='/dashboard' component={Dashboard} />
          <Route path="/artistnearyou" component={ArtistNear } />
          <Route path="/events" component={Events } />
          <Route path="/eventsnearyou" component={EventsNear} />
          <Route path="/fansnearyou" component={FansNear } />
          <Route path="/support" component={Support} />
         
        </Switch>
        
      <Switch>

        <Redirect from="/" to="/login" exact />
        <Route path='/signup' component={SignUp} />
        <Route path='/login' component={Login} />
       

      </Switch>
   
    </BrowserRouter>

  );
}

export default App;
