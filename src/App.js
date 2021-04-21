import { React, useState } from 'react'
import MyAppBar from './components/MyAppBar.js'
import Home from './components/pages/Home.js'
import Register from './components/pages/Register.js'
import Login from './components/pages/Login.js'
import UserContext from './components/UserContext.js'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const user = {
    isLoggedIn,
    setIsLoggedIn
  }
  
  return (
    <UserContext.Provider value={ user }>
      <Router>
          <header>
            <MyAppBar/>
          </header>
          <main>
            <Switch>
              <Route path="/login">
                <Login/>
              </Route>
              <Route path="/register">
                <Register/>
              </Route>
              <Route exact path="/">
                <Home />
              </Route>
            </Switch>
          </main>
      </Router>
    </UserContext.Provider>
  )
}

export default App;
