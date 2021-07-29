import React, { useState } from 'react'
import { Redirect } from 'react-router'
import Typography from '@material-ui/core/Typography'
import { Button } from '@material-ui/core'
import { Link as RouterLink } from 'react-router-dom'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'

import axios from 'axios'
import { withSnackbar } from 'notistack';

import { isSignedIn } from '../../../helper-functions.js'
import { useAppContext } from '../../../AppContext.js'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(6, 2)
  },
  form: {

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
}));

const UploadWriting = function (props) {
  const appContext = useAppContext()
  const classes = useStyles()

  const [text, setText] = useState('')
  const [title, setTitle] = useState('')
  const [active, setActive] = useState(false)

  const submitHandler = async (e) => {
    e.preventDefault()

    const writingObject = {
      title: title,
      text: text,
      active: active
    };

    try {
      const response = await axios.post(
        `${appContext.apiURL}/writings/create`,
        writingObject,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`
          }
        }
      )
      resetStates()
      showSnackBar('success', response.data.message)
    } catch (error) {
      showSnackBar('error', error.response.data.message)
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

  const resetStates = () => {
    setText('')
    setTitle('')
    setActive(false)
  }

  return isSignedIn() ? (
      <Container maxWidth='md' className={classes.root}>
        <TextField
          label='Your text'
          variant='outlined'
          multiline
          rows={16}
          margin="normal"
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
            to='/register'
            onClick={submitHandler}>Submit
          </Button>

        </div>
      </Container>
  ) : (
      <Redirect to="/" />
    )
}

export default withSnackbar(UploadWriting)