import './App.css';
import { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  const [user, setUser] = useState({})
  return (
    <BrowserRouter>
      <div className='App'>
        <Switch>
          <Route path="/testing">
            <h1>Test Route</h1>
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
