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
import { createMuiTheme } from '@material-ui/core'
import ThemeProvider from '@material-ui/styles/ThemeProvider'
import CssBaseline from '@material-ui/core/CssBaseline'

const appTheme = createMuiTheme({
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
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </main>
      </Router>
      </ThemeProvider>
    </>
  )
}

export default App;
