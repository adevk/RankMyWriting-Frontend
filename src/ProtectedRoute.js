import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'

import { isSignedIn } from './helper-functions.js'

/**
 * Protects a child component from unauthorized access.
 *
 * @component
 */
const ProtectedRoute = ({ children, ...rest }) => {
  return (
    // If user is signed in, returns child component; otherwise, redirects to startpage.
    <Route {...rest} render={() => {
      return isSignedIn() ? children : <Redirect to='/'/>
    }}/>
  )
}

ProtectedRoute.propTypes = {
  /** The child component to be protected. */
  children: PropTypes.node.isRequired
}

export default ProtectedRoute
