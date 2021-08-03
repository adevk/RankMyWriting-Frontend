import { React } from 'react'
import { useLocation, useHistory } from 'react-router'
import { Link as RouterLink } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar, Typography, Button, Link, Hidden } from '@material-ui/core'

import { isSignedIn, deleteAuthToken } from '../../helper-functions.js'
import DropDownMenu from './DropDownMenu'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  nav: {
    '& > *': {
      marginLeft: theme.spacing(2),
      fontWeight: 600
    }
  },
  menu: {
    width: 200
  },
  title: {
    flexGrow: 1,
    fontWeight: 'bold',
    color: theme.palette.primary.main
  },
  navLink: {
    color: 'primary',
    '&:hover': {
      textDecoration: 'none',
      color: theme.palette.primary.dark
    }
  },
  voteButton: {
    borderRadius: 6,
    borderWidth: 3,
    fontWeight: 800,
    '&:hover': {
      borderWidth: 3
    }
  }
}))

/**
 * The application appbar.
 *
 * @component
 */
const CustomAppBar = () => {
  const classes = useStyles()
  const location = useLocation()
  const history = useHistory()

  /**
   * Handles loggin out.
   */
  const logoutHandler = () => {
    deleteAuthToken()
    history.push({
      pathname: '/home',
      state: { redirection: true, message: 'You have signed out.' }
    })
  }

  /**
   * Renders sign-in button or menu, depending on if the user is logged in or not.
   */
  const renderButtonOrMenu = () => {
    if (!isSignedIn()) {
      // Don't render button if current page is sign-in page.
      if (location.pathname === '/login') return
      // Otherwise, render button.
      return (
        <Button
          variant='contained'
          color='primary'
          component={RouterLink} to='/login'>
            Sign in
        </Button>
      )
    }
    // If user is signed-in, render drop-down menu.
    return (
      <DropDownMenu
        className={classes.menu}
        logoutHandler={logoutHandler}
        voteHandler={() => history.push('/vote')}
        settingsHandler={() => history.push('/settings')}/>
    )
  }

  return (
    <div className={classes.root}>
      <AppBar position='static' color='default'>
        <Toolbar>
          <Typography variant='h6' component='h1' className={classes.title}>
            RankMyWriting
          </Typography>
          {
            !isSignedIn()
              ? (
                <nav className={classes.nav}>
                  <Link
                    variant='button'
                    className={classes.navLink}
                    component={RouterLink}
                    to='/'>
                      Home
                  </Link>
                  {renderButtonOrMenu()}
                </nav>
                )
              : (
                <nav className={classes.nav}>
                  <Link
                    variant='button'
                    className={classes.navLink}
                    component={RouterLink}
                    to='/dashboard'>
                      Dashboard
                  </Link>
                  {/* Don't show button on smaller screens. */}
                  <Hidden xsDown>
                    <Button
                      className={classes.voteButton}
                      variant='outlined'
                      color='secondary'
                      disableElevation
                      disableRipple
                      disableFocusRipple
                      component={RouterLink}
                      to='/vote'>
                        Vote
                    </Button>
                  </Hidden>
                  {renderButtonOrMenu()}
                </nav>
                )
          }
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default CustomAppBar
