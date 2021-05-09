import { React, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import { isLoggedIn } from '../../helper.js'
import { Link as RouterLink } from 'react-router-dom'

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
    <div className="sm:container mx-auto px-4 py-4 flex flex-col sm:flex-row justify-center">
      <RouterLink to='/upload-writing'>
        <button
          className="block bg-primary text-white rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 py-2 px-10 mt-6">
            Add Writing
        </button>
      </RouterLink>
    </div>
  )
}
