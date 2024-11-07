import React, { useContext } from 'react'
import PropTypes from 'prop-types'
const Context = React.createContext()

/**
 * App-wide context.
 *
 * @component
 */
export const AppContext = ({ children }) => {
  const apiURL = (process.env.NODE_ENV === 'production') ? process.env.REACT_APP_API_URL : `http://localhost:${process.env.REACT_APP_API_PORT || 7003}`

  return (
    <Context.Provider value={{ apiURL }}>
      {children}
    </Context.Provider>
  )
}

AppContext.propTypes = {
  /** The children elements to which the context should be available. */
  children: PropTypes.node.isRequired
}

/**
 * Hook for using context.
 *
 * @returns {object} The context object.
 */
export const useAppContext = () => {
  return useContext(Context)
}
