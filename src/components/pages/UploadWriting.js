import React, { useState } from 'react'
import axios from 'axios'
import { Redirect, useHistory } from 'react-router'
import { isSignedIn } from '../../helper.js'
import Typography from '@material-ui/core/Typography'
import { Button } from '@material-ui/core'
import { Link as RouterLink } from 'react-router-dom'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'


const apiURL = (process.env.NODE_ENV === 'production') ? 'https://cscloud7-201.lnu.se/api' : 'http://localhost:7003'

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
    marginTop: theme.spacing(1)
  }
}));

export default function UploadWriting() {
  const classes = useStyles()
  const history = useHistory()

  const [text, setText] = useState('')
  const [title, setTitle] = useState('')
  const [active, setActive] = useState(false)

  const submitHandler = async (e) => {
    e.preventDefault()

    console.log('Text: ' + text)
    console.log('Title: ' + title)
    // console.log('Category: ' + category)
    console.log('Checked: ' + active)

    const writingObject = {
      title: title,
      text: text,
      active: active
    };

    try {
      const response = await axios.post(
        `${apiURL}/writings/create`,
        writingObject,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`
          }
        }
      )
      console.log(response.data)
      history.push('/dashboard')
    } catch (error) {
      console.log(error.response.data.message)
    }
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
              onChange={(e) => setTitle(e.target.value)}/>
          </div>

          <FormGroup row className={classes.checkboxGroup}>
            <FormControlLabel
              label='Test active'
              control={
                <Checkbox
                  checked={active}
                  color='primary'
                  onChange={(e) => setActive(e.target.checked)}
                />
              }
            />
          </FormGroup>

          <Button variant='contained'
                  color='primary'
                  component={RouterLink}
                  to='/register'
                  className={classes.button}
                  onClick={submitHandler}>Submit
          </Button>

        </div>
      </Container>
  ) : (
      <Redirect to="/" />
    )
}
