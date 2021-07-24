import React, { useContext } from 'react'




const Context = React.createContext()

export const AppContext = ({children}) => {

  const apiURL = (process.env.NODE_ENV === 'production') ? 'https://cscloud7-201.lnu.se/api' : 'http://localhost:7003'
  
  return (
    <Context.Provider value={{apiURL}}>
      {children}
    </Context.Provider>
  )
}

export const useAppContext = () => {
  return useContext(Context)
}
