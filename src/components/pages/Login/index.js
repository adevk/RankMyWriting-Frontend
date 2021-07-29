import { React, useState, useEffect } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { Link as RouterLink, Redirect, useLocation } from 'react-router-dom'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

import { useAppContext } from '../../../AppContext.js'
import { isSignedIn } from '../../../helper-functions.js'
import { withSnackbar } from 'notistack';

//TODO Give feedback messages on failed login.

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
  subheader: {
  }
}));



function Login (props) {
  const appContext = useAppContext()
  const classes = useStyles()
  const history = useHistory()
  const location = useLocation()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (location.state && location.state.fromRegisterPage) {
      showSnackBar('success', location.state.message)
      location.state.fromRegisterPage = false
    }
  })

  const showSnackBar = (variant, message) => {
    props.enqueueSnackbar(message, {
      variant: variant,
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'center'
      }
    })
  }

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
            "Content-Type": "application/json",
          }
        }
      )
      const token = response.data.token
      // Store jwt token in browser.
      localStorage.setItem('authToken', token)
      // Redirect to dashboard page.
      history.push({
        pathname: '/dashboard',
        state: { fromLoginPage: true, message: 'You have logged in successfully.' }
      })
      // Refresh page and update states.
      // window.location.reload(false)
    } catch (error) {
      // Show snackbar with error message.
      error.response && props.enqueueSnackbar(error.response.data.message, {
        variant: 'error',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center'
        }
      })
    }
  }

  return isSignedIn() ? (
    <Redirect to='/'/>
  ) : (
    <Container className={classes.container} maxWidth="xs">
      <Typography component="h1" variant="h5" align='center' gutterBottom>
        Sign in
      </Typography>
      <Grid container justify='center' spacing={1}>
        <Grid item>
          <Typography component="h2" variant='subtitle1' align='center'>No account?</Typography>
        </Grid>
        <Grid item>
          <RouterLink to='/register' className={classes.link}>
            <Typography component="h2" variant='subtitle1' align='center' color='secondary'>Register now.</Typography>
          </RouterLink>
        </Grid>
      </Grid>
      <form className={classes.form} noValidate onSubmit={submitHandler}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Grid container justify='center'>
            <Grid item>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}>
                  Sign in
              </Button>
            </Grid>
          </Grid>
        </form>
    </Container>
  )
}

// Makes it possible to use to call snackbar functions within the component
export default withSnackbar(Login)