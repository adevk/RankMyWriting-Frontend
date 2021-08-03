import React, { useContext } from 'react'

const Context = React.createContext()

/**
 * App-wide context.
 * 
 * @component
 *
 * @property {object} children - The children elements that the context should contain.
 */
export const AppContext = ({children}) => {

  const apiURL = (process.env.NODE_ENV === 'production') ? 'https://cscloud7-201.lnu.se/api' : 'http://localhost:7003'

  return (
    <Context.Provider value={{apiURL}}>
      {children}
    </Context.Provider>
  )
}

/**
 * Hook for using context.
 * 
 * @returns {object} The context object.
 */
export const useAppContext = () => {
  return useContext(Context)
}
