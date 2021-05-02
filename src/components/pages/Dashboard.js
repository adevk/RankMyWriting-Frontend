import { React, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import { isLoggedIn } from '../../helper.js'

const apiURL = (process.env.NODE_ENV === 'production') ? 'https://cscloud7-201.lnu.se/api' : 'http://localhost:7003'

export default function Dashboard () {

  const [dashboardMessage, setDashboardMessage] = useState('')

  useEffect(() => {
    
    if (isLoggedIn()) {
      fetchUserData();
    }
  }, [])

  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        `${apiURL}/dashboard`, 
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`
          }
        }
      )
      const userData = response.data.userData
      if (!dashboardMessage) {
        setDashboardMessage(`Hello ${userData.username}`)
      }
    } catch (error) {
      localStorage.removeItem("authToken");
      setDashboardMessage('Error occured. Please login again.')
    }
  }


  return !isLoggedIn() ? (
    <Redirect to='/'/>
  ) : (
   <h1>{ dashboardMessage }</h1>
  )
}
