import { React, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import {Button} from "@material-ui/core";
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { isSignedIn } from '../../../helper-functions.js'
import image from './presentation_image.svg'
import Hidden from '@material-ui/core/Hidden'

import { withSnackbar } from 'notistack';


const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(6, 0)
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(4),
  },
  image: {
    padding: theme.spacing(4),
    width: '100%'
  },
  button: {
  },
  belowButton: {
    display: 'flex',
    padding: theme.spacing(1)
  },
  signupLink: {
    marginLeft: theme.spacing(0.5),
    textDecoration: 'none'
  }
}));

function Home(props) {
  const classes = useStyles()
  const location = useLocation()

  useEffect(() => {
    if (location.state && location.state.loggedOut) {
      showSnackBar('success', location.state.message)
      location.state.loggedOut = false
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

  return (
    <Container maxWidth='md' className={classes.root}>
      <Grid container>
        <Hidden smDown>
          <Grid item md={6} xs={12}>
            <img src={image} alt='Image' className={classes.image}/>
          </Grid>
        </Hidden>
        <Grid item md={6} xs={12} className={classes.column}>
          <Typography variant='h3' align='center' gutterBottom>Wondering if your writing is good enough?</Typography>
          <Typography variant='body1' align='center' paragraph gutterBottom>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Typography>
          { // Only show register button if user is not logged in.
            !isSignedIn() &&
            <Button variant='contained'
                    color='primary'
                    component={RouterLink}
                    to='/register'
                    className={classes.button}>
              Register now
            </Button>
          }
            <div className={classes.belowButton}>
              <Typography component="h2" variant='subtitle1' align='center'>Already have an account?</Typography>
              <RouterLink to='/login' className={classes.signupLink}>
                <Typography component="h2" variant='subtitle1' align='center' color='secondary'>Sign in.</Typography>
              </RouterLink>
            </div>
        </Grid>
      </Grid>
    </Container>
  );
}

export default withSnackbar(Home)