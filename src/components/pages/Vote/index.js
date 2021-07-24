import { React, useState, useReducer, useEffect } from 'react';
import { Redirect } from 'react-router'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, Divider, Grid } from '@material-ui/core'
import ButtonGroup from '@material-ui/core/ButtonGroup'

import axios from 'axios'

import { isSignedIn } from '../../../helper'
import { reducer } from './reducer'
import { useAppContext } from '../../../AppContext.js'
import { ScoreSlider } from './ScoreSlider.js'


const marks = [...Array(6).keys()].map((num) => ({value: num, label: num}))

const DEFAULT_SCORE = 3
const defaultState = {
  convincingScore: DEFAULT_SCORE,
  engagingScore: DEFAULT_SCORE,
  comprehensibleScore: DEFAULT_SCORE,
  isConversational: null,
  isFormal: null,
  isNegative: null,
  isPositive: null,
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


export default function Vote () {
  const [state, dispatch] = useReducer(reducer, defaultState)
  const [writing, setWriting] = useState({})
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
      console.log(response.data.message)
      setWriting(randomWriting)
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
      conversational: state.isConversational,
      positive: state.isPositive,
      personal: state.isPersonal
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
      console.log(response.data.message)
      await fetchRandomWritingForVoting()
    } catch (error) {
      console.log(error.message)
    }
  }


  const setColor = (stateVariable) => {
    if (stateVariable === null)
      return 'primary'
    return stateVariable ? 'secondary' : 'primary'
  }

  return !isSignedIn() ? (
    <Redirect to='/'/>
  ) : (
    <Container maxWidth='lg'>

      <Box py={2}>
          <Typography variant='h3' component='h1' align='center'>
            Vote on the writing...
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
              <Typography variant='h5' component='h2' align='center'>Tone</Typography>
              <Box align='center' mt={2}>
                <ButtonGroup disableElevation variant="contained" color="primary">
                  <Button
                    color={setColor(state.isFormal)}
                    onClick={() => {
                    dispatch({type: 'TOGGLE_FORMAL', payload: state.isFormal})
                    }}>Formal
                  </Button>
                  <Button
                    color={setColor(state.isConversational)}
                    onClick={() => {
                      dispatch({type: 'TOGGLE_CONVERSATIONAL', payload: state.isConversational})
                    }}>Conversational
                  </Button>
                </ButtonGroup>
              </Box>
              <Box align='center' mt={2}>
                <ButtonGroup disableElevation variant="contained" color="primary">
                  <Button
                    color={setColor(state.isNegative)}
                    onClick={() => {
                      dispatch({type: 'TOGGLE_NEGATIVE', payload: state.isNegative})
                    }}>Negative
                  </Button>
                  <Button
                    color={setColor(state.isPositive)}
                    onClick={() => {
                      dispatch({type: 'TOGGLE_POSITIVE', payload: state.isPositive})
                    }}>Positive
                  </Button>
                </ButtonGroup>
              </Box>
              <Box align='center' mt={2}>
                <ButtonGroup disableElevation variant="contained" color="primary">
                  <Button color={setColor(state.isImpersonal)} onClick={() => {
                    dispatch({type: 'TOGGLE_IMPERSONAL', payload: state.isImpersonal})
                  }}>Impersonal</Button>
                  <Button color={setColor(state.isPersonal)} onClick={() => {
                    dispatch({type: 'TOGGLE_PERSONAL', payload: state.isPersonal})
                  }}>Personal</Button>
                </ButtonGroup>
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
