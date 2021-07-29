import { React, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Button} from "@material-ui/core";
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import image from './presentation_image.svg'
import Hidden from '@material-ui/core/Hidden'
import useMediaQuery from '@material-ui/core/useMediaQuery'

import { withSnackbar } from 'notistack';

import { isSignedIn } from '../../../helper-functions.js'


const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down('sm')] : {
      padding: theme.spacing(1, 0)
    },
    [theme.breakpoints.up('sm')] : {
      padding: theme.spacing(6, 0)
    }
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
  const aboveSm = useMediaQuery(theme => theme.breakpoints.up('sm'))


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
            <img src={image} alt='Startpage illustration' className={classes.image}/>
          </Grid>
        </Hidden>
        <Grid item md={6} xs={12} className={classes.column}>
          <Typography variant={aboveSm ? 'h3' : 'h4'} align='center' gutterBottom>Wondering if your writing is good enough?</Typography>
          <Typography variant='body1' align='center' paragraph gutterBottom>Create an account with us and you will be able upload your writings quick and easy, and receive opinions on your writings from people all over the world.</Typography>
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