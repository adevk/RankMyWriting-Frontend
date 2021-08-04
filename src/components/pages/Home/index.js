import { React, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { Container, Button, Typography, Grid, Hidden } from '@material-ui/core'
import { Link as RouterLink, useLocation } from 'react-router-dom'

import { withSnackbar } from 'notistack'

import { isSignedIn, showSnackBar } from '../../../helper-functions.js'
import image from './presentation_image.svg'

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1, 0)
    },
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(6, 0)
    }
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(4)
  },
  image: {
    padding: theme.spacing(4),
    width: '100%'
  },
  belowButton: {
    display: 'flex',
    padding: theme.spacing(1)
  },
  signupLink: {
    marginLeft: theme.spacing(0.5),
    textDecoration: 'none'
  }
}))

/**
 * The homepage component.
 *
 * @component
 *
 * @property {object} props - Object containing the component's properties.
 */
const Home = (props) => {
  const classes = useStyles()
  const location = useLocation()
  const aboveSm = useMediaQuery(theme => theme.breakpoints.up('sm'))

  useEffect(() => {
    if (location.state && location.state.redirection) {
      showSnackBar('success', location.state.message, props)
      location.state.redirection = false
    }
  })

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
              <Button
                variant='contained'
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
  )
}

// Makes it possible to use to call snackbar functions within the component
export default withSnackbar(Home)
