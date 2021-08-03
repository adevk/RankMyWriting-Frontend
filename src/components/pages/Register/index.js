import React, { useState } from 'react'
import { Redirect, useHistory } from 'react-router'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { Container, Box, Typography, TextField, Button } from '@material-ui/core'

import axios from 'axios'
import { withSnackbar } from 'notistack'

import { isSignedIn, showSnackBar } from '../../../helper-functions.js'
import { useAppContext } from '../../../AppContext.js'

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(8, 4)
  },
  form: {
    width: '100%' // Fix IE 11 issue.
  },
  submit: {
    marginTop: theme.spacing(2)
  }
}))

/**
 * The register page component.
 *
 * @component
 *
 * @property {object} props - Object containing the component's properties.
 */
const Register = (props) => {
  const classes = useStyles()
  const appContext = useAppContext()
  const history = useHistory()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  /**
   * Submits the login form.
   *
   * @param {Event} event - The event object.
   */
  const submitHandler = async (event) => {
    event.preventDefault()

    const userObject = {
      username: username,
      password: password
    }

    try {
      // Post user credentials to register account.
      await axios.post(`${appContext.apiURL}/users/register`, userObject)
      history.push({
        pathname: '/login',
        state: { redirection: true, message: 'Your account has been created.\nPlease sign in with your new account.' }
      })
    } catch (error) {
      showSnackBar('error', (error.response && error.response.data.message), props)
    }
  }

  // If user is already signed in, redirect to startpage.
  return isSignedIn()
    ? (
    <Redirect to='/'/>
      )
    : (
    <Container className={classes.container} maxWidth='xs'>
        <Typography component='h1' variant='h5' align='center'>
          Create Account
        </Typography>
        <form className={classes.form} noValidate onSubmit={submitHandler}>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='username'
            label='Username'
            name='username'
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Box display='flex' justifyContent='center'>
            <Button
              type='submit'
              variant='contained'
              color='primary'
              className={classes.submit}>
                Register
            </Button>
        </Box>
        </form>
    </Container>
      )
}

// Makes it possible to use to call snackbar functions within the component
export default withSnackbar(Register)
