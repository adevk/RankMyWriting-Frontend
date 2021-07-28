import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { createMuiTheme } from '@material-ui/core'
import { MuiThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import { SnackbarProvider } from 'notistack';

import { AppContext } from './AppContext.js'

import MyAppBar from './components/MyAppBar.js'

import Home from './components/pages/Home/'
import Register from './components/pages/Register/'
import Login from './components/pages/Login/'
import Dashboard from './components/pages/Dashboard/'
import UploadWriting from './components/pages/UploadWriting/'
import Vote from './components/pages/Vote/'
import Settings from './components/pages/Settings'

const appTheme = createMuiTheme({
  spacing: 8,
  palette: {
    primary: {
      main: '#432EEA'
    },
    secondary: {
      main: '#25D36A',
    },
    error: {
      main: '#f44336',
      dark: '#d32f2f',
      contrastText: '#fff'
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
        <MuiThemeProvider theme={appTheme}>
          <SnackbarProvider maxSnack={1}>
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
                    <Route path="/settings">
                      <Settings/>
                    </Route>
                    <Route path="/">
                      <Home />
                    </Route>
                  </Switch>
                </main>
            </Router>
          </SnackbarProvider> 
        </MuiThemeProvider>
      </AppContext>
    </>
  )
}

export default App;
