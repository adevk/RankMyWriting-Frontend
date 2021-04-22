import { React, useState, useContext, useEffect } from 'react';
import { Link as RouterLink, Redirect } from 'react-router-dom'
import axios from 'axios'
import UserContext from '../UserContext';


export default function Dashboard () {

  const { isLoggedIn, setIsLoggedIn } = useContext(UserContext)
  const [dashboardMessage, setDashboardMessage] = useState('')

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:7003/dashboard', 
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("authToken")}`
            }
          }
        )
        const userData = response.data
        setDashboardMessage(`Hello ${userData.username}`)
      } catch (error) {
        localStorage.removeItem("authToken");
        setIsLoggedIn(false)
        setDashboardMessage('Error occured. Please login again.')
      }
    };
    if (isLoggedIn) {
      fetchUserData();
    }
  }, [])


  return !isLoggedIn ? (
    <Redirect to='/'/>
  ) : (
   <h1>{ dashboardMessage }</h1>
  )
}
