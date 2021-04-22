import React, { useState } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import axios from 'axios'
import { Redirect } from 'react-router';
import { isLoggedIn } from '../../helper.js'


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

export default function Register () {
  const classes = useStyles()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const submitHandler = async (e) => {
    e.preventDefault()

    const userObject = {
      username: username,
      password: password
    };

    axios.post('http://localhost:7003/register', userObject)
      .then((res) => {
          console.log(res.data)
      }).catch((error) => {
          console.log(error.response.data.message)
      });
   
  }

  return isLoggedIn() ? (
    <Redirect to='/'/>
  ) : (
    <Container className={classes.container} maxWidth="xs">
        <Typography component="h1" variant="h5" align='center'>
          Sign up
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
                  Sign up
              </Button>
            </Grid>
          </Grid>
        </form>
    </Container>
  )
}
