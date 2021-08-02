import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import { isSignedIn } from './helper-functions.js'


const ProtectedRoute = ({ children, ...rest }) => {
  return (
    // If user is signed in, returns child component; otherwise, redirects to startpage.
    <Route {...rest} render={() => {
      return isSignedIn() ? children : <Redirect to='/'/>
    }}/>
  )
}

export default ProtectedRoute