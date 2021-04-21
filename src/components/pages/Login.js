import { React, useState } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { Link as RouterLink } from 'react-router-dom'
import axios from 'axios'


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
  subheader: {
  }
}));

export default function Login () {
  const classes = useStyles()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const submitHandler = async (e) => {
    e.preventDefault()

    const userObject = {
      username: username,
      password: password
    };

    try {
      const response = await axios.post(
        'http://localhost:7003/login', 
        userObject,
        {
          header: {
            "Content-Type": "application/json",
          }
        }
      )
      const token = response.data.token
      localStorage.setItem('authToken', token)
    } catch (error) {
      console.log(error.response.data.message)
    }
    
   
  }

  return (
    <Container className={classes.container} maxWidth="xs">
      <Typography component="h1" variant="h5" align='center' gutterBottom>
        Log in
      </Typography>
      <Grid container justify='center' spacing={1}>
        <Grid item>
          <Typography component="h2" variant='subtitle1' align='center'>No account?</Typography>
        </Grid>
        <Grid item>
          <RouterLink to='/register'>
            <Typography component="h2" variant='subtitle1' align='center' color='secondary'>Signup now.</Typography>
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
                  Log in
              </Button>
            </Grid>
          </Grid>
        </form>
    </Container>
  );
}