import { React, useState, useEffect } from 'react';
import axios from 'axios'
import { Link as RouterLink } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import { Divider, Grid } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'
import { Redirect } from 'react-router'

import { isSignedIn } from '../../../helper'
import TextCard from '../../WritingCard'
import { useAppContext } from '../../../AppContext.js'

const useStyles = makeStyles((theme) => ({
  topBar: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '2rem'
  }
}));

export default function Dashboard () {
  const appContext = useAppContext()
  const classes = useStyles()

  const [writings, setWritings] = useState([])
  const [points, setPoints] = useState(0)

  useEffect(() => {
    fetchWritings()
  }, [])

  const fetchWritings = async () => {
    try {
      const response = await axios.get(
        `${appContext.apiURL}/writings/retrieve`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`
          }
        }
      )
      const writings = response.data.data
      setWritings(writings)
      console.log(writings)
    } catch (error) {
      console.log(error.message)
    }
  }

  return !isSignedIn() ? (
      <Redirect to='/'/>
    ) : (
    <Container maxWidth="lg">

      <div id="topbar" className={classes.topBar}>
        <div id="textGroup">
          <Typography variant="h6" color="textPrimary">
            Points: {points}
          </Typography>
          <Link component={RouterLink} to="/vote" color="secondary" underline="always">
            Get more
          </Link>
        </div>

        <RouterLink to='/upload-writing'>
          <Button variant="contained" color="primary">
            Add Writing
          </Button>
        </RouterLink>
      </div>

      <Divider/>

      <main>
        <Grid container spacing={2}>
          {writings.map(({_id, title, votes}) =>(
            <Grid item xs={12} sm={6} md={4} key={_id}>
              <TextCard title={title} votes={votes || 0}/>
            </Grid>
          ))}
        </Grid>
      </main>

    </Container>
  )
}
