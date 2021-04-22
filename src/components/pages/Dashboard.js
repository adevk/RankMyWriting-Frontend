import { React, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import { isLoggedIn } from '../../helper.js'

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
        'http://localhost:7003/dashboard', 
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
