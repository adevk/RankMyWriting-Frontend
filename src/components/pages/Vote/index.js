import { React, useState, useReducer, useEffect } from 'react';
import { Redirect } from 'react-router'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, Divider, Grid } from '@material-ui/core'
import ButtonGroup from '@material-ui/core/ButtonGroup'

import axios from 'axios'
import { withSnackbar } from 'notistack';

import { isSignedIn } from '../../../helper-functions.js'
import { reducer } from './reducer'
import { useAppContext } from '../../../AppContext.js'
import { ScoreSlider } from './ScoreSlider.js'


const marks = [...Array(6).keys()].map((num) => ({value: num, label: num}))

const DEFAULT_SCORE = 3
const defaultState = {
  convincingScore: DEFAULT_SCORE,
  engagingScore: DEFAULT_SCORE,
  comprehensibleScore: DEFAULT_SCORE,
}

const useStyles = makeStyles((theme) => ({
  voteButton: {
    borderRadius: 6,
    borderWidth: 3,
    fontWeight: 800,
    '&:hover': {
      borderWidth: 3
    }
  }
}));


function Vote (props) {
  const [state, dispatch] = useReducer(reducer, defaultState)
  const [writing, setWriting] = useState(null)
  const appContext = useAppContext()
  const classes = useStyles()

  useEffect(() => {
    fetchRandomWritingForVoting()
  }, [])

  const fetchRandomWritingForVoting = async () => {
    try {
      const response = await axios.get(
        `${appContext.apiURL}/writings/random`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`
          }
        }
      )
      const randomWriting = response.data.data
      if (randomWriting) {
        setWriting(randomWriting)
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  const submitHandler = async (e) => {
    e.preventDefault()

    const writingId = writing._id
    const voteObject = {
      comprehensible: state.comprehensibleScore,
      engaging: state.engagingScore,
      convincing: state.convincingScore,
    }
    try {
      const response = await axios.post(
        `${appContext.apiURL}/writings/${writingId}/vote`,
        voteObject,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`
          }
        }
      )
      dispatch({type: 'RESET_STATES'})
      showSnackBar('success', 'You have successfully casted a vote on the writing.')
      await fetchRandomWritingForVoting()
    } catch (error) {
      showSnackBar('error', error.response.data.message)
      console.log(error.response.data.message)
    }
  }

  const showSnackBar = (variant, message) => {
    props.enqueueSnackbar(message, {
      variant: variant,
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'center'
      }
    })
  }


  const setColor = (stateVariable) => {
    if (stateVariable === null)
      return 'primary'
    return stateVariable ? 'secondary' : 'primary'
  }

  const renderPage = (randomWriting) => {
    if (!writing) {
      return (
      <Container maxWidth='lg'>
        <main>
          <Box mt={4}>
            <Typography variant='h4' component='h1' align='center'>There are no writings to vote on...</Typography>
            <Typography variant='h6' component='h2' align='center'>Please check back later when other users have uploaded some writings.</Typography>
          </Box>
        </main>
      </Container>
      )
    }

    return (
      <Container maxWidth='lg'>

      <Box py={2}>
          <Typography variant='h4' component='h1' align='center'>
            Vote on the writing
          </Typography>
      </Box>

      {/*Title divider*/}
      <Divider/>

      <main>
        <Grid container p={2}>
          {/*Left side*/}
          <Grid item xs>
            <Box px={4} mt={2}>
              <Typography variant='h4' component='h2' align='center'>{writing.title}</Typography>
              <Box my={2} px={1}>
                <Divider/>
              </Box>
              <Typography variant='body'>{writing.text}</Typography>
            </Box>
          </Grid>
          {/*Vertical divider*/}
          <Grid item xs={0}>
            <Divider orientation='vertical'/>
          </Grid>
          {/*Right side*/}
          <Grid item xs>
            <Box mt={2}>
              <Typography variant='h5' component='h2' align='center' gutterBottom>Attribute scores from 1-5</Typography>
              <Box mt={4} px={4}>
                <Typography display='inline'>Comprehensible</Typography>
                <ScoreSlider
                  value={state.comprehensibleScore}
                  step={1}
                  marks={marks}
                  max={5}
                  valueLabelDisplay='on'
                  onChange={(e, newValue) => {
                    dispatch({type: 'SET_COMPREHENSIBLE_SCORE', payload: newValue})
                  }}/>
              </Box>
              <Box mt={2} px={4}>
                <Typography display='inline'>Engaging</Typography>
                <ScoreSlider
                  value={state.engagingScore}
                  step={1}
                  marks={marks}
                  max={5}
                  valueLabelDisplay='on'
                  onChange={(e, newValue) => {
                    dispatch({type: 'SET_ENGAGING_SCORE', payload: newValue})
                  }}/>
              </Box>
              <Box mt={2} px={4}>
                <Typography display='inline'>Convincing</Typography>
                <ScoreSlider
                  value={state.convincingScore}
                  step={1}
                  marks={marks}
                  max={5}
                  valueLabelDisplay='on'
                  onChange={(e, newValue) => {
                    dispatch({type: 'SET_CONVINCING_SCORE', payload: newValue})
                  }}/>
              </Box>              

            </Box>

          </Grid>
        </Grid>


      <Box my={6} align='center'>
        <Button className={classes.voteButton} variant='contained'
                  color='primary'
                  to='/register'
                  onClick={submitHandler}>Submit vote
        </Button>
      </Box>

      </main>

    </Container>
    )
  }
  // If user is not authenticated, redirect him to the homepage.
  return !isSignedIn() ? (
    <Redirect to='/'/>
  ) : (
    renderPage()
  )
}

export default withSnackbar(Vote)