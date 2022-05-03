import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'

import Dashboard from './views/Dashboard'
import Login from './views/Login'
import SignUp from './views/SignUp'

function App() {

  return (
    <BrowserRouter>
      <Switch>

        <Redirect from="/" to="/login" exact />
        <Route path='/signup' component={SignUp} />
        <Route path='/login' component={Login} />
        <Route path='/dashboard' component={Dashboard} />

      </Switch>
    </BrowserRouter>

  );
}

export default App;
