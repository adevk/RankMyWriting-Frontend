import React, { useState } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { Redirect, useHistory } from 'react-router';

import axios from 'axios'
import { withSnackbar } from 'notistack';

import { isSignedIn } from '../../../helper-functions.js'
import { useAppContext } from '../../../AppContext.js'


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
}));


//TODO Add feedback on registration (maybe redirection?)

function Register (props) {
  const classes = useStyles()
  const appContext = useAppContext()
  const history = useHistory()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const submitHandler = async (e) => {
    e.preventDefault()

    const userObject = {
      username: username,
      password: password
    };
    
    // Post user credentials to register account.
    axios.post(`${appContext.apiURL}/users/register`, userObject)
      .then((res) => {
        history.push({
          pathname: '/login',
          state: { fromRegisterPage: true, message: "You're account has been created.\nPlease sign in with your new account." }
        })
      }).catch((error) => {
          showSnackBar('error', error.response.data.message)
     })
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
  return isSignedIn() ? (
    <Redirect to='/'/>
  ) : (
    <Container className={classes.container} maxWidth="xs">
        <Typography component="h1" variant="h5" align='center'>
          Create Account
        </Typography>
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
                  Register
              </Button>
            </Grid>
          </Grid>
        </form>
    </Container>
  )
}


export default withSnackbar(Register)