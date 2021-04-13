import React from 'react'
import MyAppBar from './components/MyAppBar.js'
import Home from './components/pages/Home.js'
import Register from './components/pages/Register.js'
import Login from './components/pages/Login.js'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <Router>
        <header>
          <MyAppBar/>
        </header>
        <main>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/login">
              <Login/>
            </Route>
            <Route path="/register">
              <Register/>
            </Route>
          </Switch>
        </main>
    </Router>
  )
}

export default App;
