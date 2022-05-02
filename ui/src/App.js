import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom'
import Dashboard from './views/Dashboard'
import Login from './views/Login'
import SignUp from './views/SignUp'

function App() {
  return (
  <BrowserRouter>
  <Switch>
    <Route exact path='/' component={Dashboard} />
    <Route path='/login' component={Login}/>
    <Route path='/signup' component={SignUp}/>
  </Switch>
  </BrowserRouter>

  );
}

export default App;
