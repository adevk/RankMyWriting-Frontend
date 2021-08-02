import { React, useState, useReducer, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Container, Grid, Box, Divider, Button, Typography, Hidden } from '@material-ui/core'

import axios from 'axios'
import { withSnackbar } from 'notistack'

import { showSnackBar, getAuthToken } from '../../../helper-functions.js'
import { reducer } from './reducer'
import { useAppContext } from '../../../AppContext.js'
import { ScoreSlider } from './ScoreSlider.js'


const marks = [...Array(6).keys()].map((num) => ({value: num, label: num}))

export const DEFAULT_SCORE = 3

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


const Vote = (props) => {
  const [state, dispatch] = useReducer(reducer, defaultState)
  const [writing, setWriting] = useState(null)
  const classes = useStyles()
  const appContext = useAppContext()


  useEffect(() => {
    fetchRandomWritingForVoting()
  }, [])

  const fetchRandomWritingForVoting = async () => {
    try {
      const response = await axios.get(
        `${appContext.apiURL}/writings/random`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getAuthToken()}`
          }
        }
      )
      const randomWriting = response.data.data
      // If a random writing was fetched from backend.
      if (randomWriting) {
        setWriting(randomWriting)
      } else {
        setWriting(null)
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
      await axios.post(
        `${appContext.apiURL}/writings/${writingId}/vote`,
        voteObject,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getAuthToken()}`
          }
        }
      )
      dispatch({type: 'RESET_STATES'})
      showSnackBar('success', 'You have successfully casted a vote on the writing.', props)
      await fetchRandomWritingForVoting()
    } catch (error) {
      showSnackBar('error', (error.response && error.response.data.message), props)
    }
  }

  const renderVotingPage = () => {
    return (
      <Container maxWidth='lg'>

      <Box py={2}>
          <Typography variant='h4' component='h1' align='center' underline>
            Vote on the writing
          </Typography>
      </Box>

      {/*Title divider*/}
      <Divider/>

      <main>
        <Grid container p={2}>
          {/*Left side*/}
          <Grid item xs={12} sm>
            <Box px={4} mt={2}>
              <Typography variant='h4' component='h2' align='center'>{writing.title}</Typography>
              <Box my={2} px={1}>
                <Divider/>
              </Box>
              <Typography variant='body'>{writing.text}</Typography>
            </Box>
          </Grid>

          {/*Only show vertical divider on larger screens.*/} 
          <Hidden xsDown>
            <Grid item xs={0}>
              <Divider orientation='vertical'/>
            </Grid>
          </Hidden>
          
          {/*Right side*/}
          <Grid item xs={12} sm>

            {/*Only show horizontal divider on smaller screens.*/} 
            <Hidden smUp>
              <Box py={2}>
                <Divider mt={2}/>
              </Box>
            </Hidden>

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
        <Button 
          className={classes.voteButton} 
          variant='contained'
          color='primary'
          onClick={submitHandler}>
            Submit vote
        </Button>
      </Box>

      </main>

    </Container>
    )
  }

  const renderNoWritingPage = () => {
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
    // If a writing was received from backend, render voting page; otherwise, render message page.
    writing ? renderVotingPage() : renderNoWritingPage()
  )
}

export default withSnackbar(Vote)