import { React, useState, useEffect } from 'react'
import { Link as RouterLink, Redirect, useLocation, useHistory } from 'react-router-dom'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { Container, Box, Typography, TextField, Button } from '@material-ui/core'

import axios from 'axios'
import { withSnackbar } from 'notistack'

import { useAppContext } from '../../../AppContext.js'
import { isSignedIn, setAuthToken, showSnackBar } from '../../../helper-functions.js'

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(8, 4),
  },
  form: {
    width: '100%', // Fix IE 11 issue.
  },
  submit: {
    marginTop: theme.spacing(2),
  },
  link: {
    textDecoration: 'none'
  },
}))

const Login = (props) => {
  const appContext = useAppContext()
  const classes = useStyles()
  const history = useHistory()
  const location = useLocation()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (location.state && location.state.redirection) {
      showSnackBar('success', location.state.message, props)
      location.state.redirection = false
    }
  })

  const submitHandler = async (e) => {
    e.preventDefault()

    const userObject = {
      username: username,
      password: password
    };

    try {
      // Make a login request
      const response = await axios.post(
        `${appContext.apiURL}/users/login`,
        userObject,
        {
          header: {
            'Content-Type': 'application/json',
          }
        }
      )
      const jwtAuthToken = response.data.token
      // Store authentication token in browser.
      setAuthToken(jwtAuthToken)
      // Redirect to dashboard page.
      history.push({
        pathname: '/dashboard',
        state: { redirection: true, message: 'You have signed in successfully.' }
      })
    } catch (error) {
      // Show snackbar with error message.
      showSnackBar('error', (error.response && error.response.data.message), props)
    }
  }

  // If user is already signed in, redirect to startpage.
  return isSignedIn() ? (
    <Redirect to='/'/>
  ) : (
    <Container className={classes.container} maxWidth='xs'>
      <Typography component='h1' variant='h5' align='center' gutterBottom>
        Sign in
      </Typography>
      <Box display='flex' justifyContent='center'>
          <Typography component='h2' variant='subtitle1' align='center'>No account?&nbsp;</Typography>
          <RouterLink to='/register' className={classes.link}>
            <Typography component='h2' variant='subtitle1' align='center' color='secondary'>Register now.</Typography>
          </RouterLink>
      </Box>
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
          onChange={(e) => setUsername(e.target.value)}/>
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
          onChange={(e) => setPassword(e.target.value)}/>
        <Box display='flex' justifyContent='center'>
          <Button
            type='submit'
            variant='contained'
            color='primary'
            className={classes.submit}>
              Sign in
          </Button>
        </Box>
      </form>
    </Container>
  )
}

// Makes it possible to use to call snackbar functions within the component
export default withSnackbar(Login)