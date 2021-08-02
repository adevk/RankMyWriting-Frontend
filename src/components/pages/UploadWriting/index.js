import React, { useState } from 'react'
import { Redirect } from 'react-router'
import { Link as RouterLink } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { Container, Button, Typography, TextField } from '@material-ui/core'

import axios from 'axios'
import { withSnackbar } from 'notistack';

import { isSignedIn, showSnackBar, getAuthToken } from '../../../helper-functions.js'
import { useAppContext } from '../../../AppContext.js'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(6, 2)
  },
  titleGroup: {
    marginTop: theme.spacing(1)
  },
  checkboxGroup: {
    marginTop: theme.spacing(1)
  },
  button: {
    width: '120px',
    marginTop: theme.spacing(2)
  }
}))

const UploadWriting = function (props) {
  const appContext = useAppContext()
  const classes = useStyles()

  const [text, setText] = useState('')
  const [title, setTitle] = useState('')

  const submitHandler = async (e) => {
    e.preventDefault()

    const writingObject = {
      title: title,
      text: text,
    }

    try {
      await axios.post(
        `${appContext.apiURL}/writings/create`,
        writingObject,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getAuthToken()}`
          }
        }
      )
      resetStates()
      showSnackBar('success', 'Your writing has been uploaded successfully. Add another one or check it out on the dashboard', props)
    } catch (error) {
      showSnackBar('error', (error.response && error.response.data.message), props)
    }
  }


  const resetStates = () => {
    setText('')
    setTitle('')
  }

  return (
      <Container maxWidth='md' className={classes.root}>
        <TextField
          label='Your text'
          variant='outlined'
          multiline
          rows={16}
          margin='normal'
          required
          fullWidth
          autoFocus={true}
          value={text}
          onChange={(e) => setText(e.target.value)}/>

        <div className={classes.form}>

          <div className={classes.titleGroup}>
            <Typography variant='subtitle1'>Title/Type</Typography>
            <TextField
              variant='outlined'
              label='Title'
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}/>
          </div>

          <Button 
            className={classes.button}
            variant='contained'
            color='primary'
            component={RouterLink}
            onClick={submitHandler}>Submit
          </Button>

        </div>
      </Container>
  )
}

export default withSnackbar(UploadWriting)