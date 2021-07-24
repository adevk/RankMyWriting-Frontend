import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { createMuiTheme } from '@material-ui/core'
import ThemeProvider from '@material-ui/styles/ThemeProvider'
import CssBaseline from '@material-ui/core/CssBaseline'

import { AppContext } from './AppContext.js'

import MyAppBar from './components/MyAppBar.js'

import Home from './components/pages/Home/'
import Register from './components/pages/Register/'
import Login from './components/pages/Login/'
import Dashboard from './components/pages/Dashboard/'
import UploadWriting from './components/pages/UploadWriting/'
import Vote from './components/pages/Vote/'

const appTheme = createMuiTheme({
  spacing: 8,
  palette: {
    primary: {
      main: '#432EEA'
    },
    secondary: {
      main: '#25D36A',
    },
    background: {
      default: '#ffffff'
    },
    tonalOffset: 0.2
  },
  overrides: {
    MuiButton: {
      root: {
        borderRadius: 50,
        fontWeight: 600
      },
    },
  },
})


function App() {

  return (
    <>
      <AppContext>
        <ThemeProvider theme={appTheme}>
        <CssBaseline/>
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
                <Route path="/vote">
                  <Vote/>
                </Route>
                <Route path="/">
                  <Home />
                </Route>
              </Switch>
            </main>
        </Router>
        </ThemeProvider>
      </AppContext>
    </>
  )
}

export default App;
