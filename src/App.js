import { React } from 'react'
import MyAppBar from './components/MyAppBar.js'
import Home from './components/pages/Home.js'
import Register from './components/pages/Register.js'
import Login from './components/pages/Login.js'
import Dashboard from './components/pages/Dashboard.js'
import UploadWriting from './components/pages/UploadWriting.js'

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
              <Route path="/login">
                <Login/>
              </Route>
              <Route path="/register">
                <Register/>
              </Route>
              <Route path="/dashboard">
                <Dashboard/>
              </Route>
              <Route path="/upload-writing">
                <UploadWriting/>
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </main>
      </Router>
  )
}

export default App;
