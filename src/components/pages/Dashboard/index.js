import { React, useState, useEffect } from 'react'
import { Redirect } from 'react-router'
import { useLocation } from 'react-router-dom'
import { Container, Divider, Grid } from '@material-ui/core'

import axios from 'axios'
import { withSnackbar } from 'notistack';

import { isSignedIn, getAuthToken, showSnackBar } from '../../../helper-functions.js'
import { useAppContext } from '../../../AppContext.js'
import WritingCard from './WritingCard.js'
import TopSection from './TopSection.js'


const Dashboard = (props) => {
  const appContext = useAppContext()
  const location = useLocation()

  const [writings, setWritings] = useState([])
  const [points, setPoints] = useState(0)

  useEffect(() => {
    // If user was redirected from another page, show snackbar with the message sent.
    if (location.state && location.state.redirection) {
      showSnackBar('success', location.state.message, props)
      location.state.redirection = false
    }
    fetchWritings()
  }, [])

  // Fetches all the user's writings from the backend.
  const fetchWritings = async () => {
    try {
      const response = await axios.get(
        `${appContext.apiURL}/writings/retrieve`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getAuthToken()}`
          }
        }
      )
      const fetchedWritings = response.data.writings
      const fetchedPoints = response.data.points
      setWritings(fetchedWritings)
      setPoints(fetchedPoints)
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
      <Container maxWidth='lg'>

        <TopSection points={points}/>

        <Divider/>

        <main>
          <Grid container spacing={2}>
            {writings.map((writing) =>(
              <Grid item xs={12} sm={6} md={4} key={writing._id}>
                <WritingCard {...writing}/>
              </Grid>
            ))}
          </Grid>
        </main>

      </Container>
  )
}

export default withSnackbar(Dashboard)