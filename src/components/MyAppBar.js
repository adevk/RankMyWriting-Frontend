import { React } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link'
import { Link as RouterLink } from 'react-router-dom'
import { isSignedIn } from '../helper-functions.js'
import { useLocation, useHistory } from 'react-router'
import DropDownMenu from './DropDownMenu'
import useMediaQuery from '@material-ui/core/useMediaQuery'

//TODO Fix appbar issue on smaller screens

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  nav: {
    '& > *': {
      marginLeft: theme.spacing(2),
      fontWeight: 600,
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



export default function MyAppBar() {
  const classes = useStyles()
  const location = useLocation()
  const history = useHistory()
  const aboveSm = useMediaQuery(theme => theme.breakpoints.up('sm'))
  console.log(location.pathname)

  const logoutHandler = () => {
    localStorage.removeItem('authToken')
    history.push({
      pathname: '/home',
      state: { loggedOut: true, message: 'You have signed out.' }
    })
  }

  const voteHandler = () => {
    history.push('/vote')
  }

  const settingsHandler = () => {
    history.push('/settings')
  }

  const renderButtonOrMenu = () => {
    // If user is not signed in, render sign-in button.
    if (!isSignedIn()) {
      // Don't render button if current page is sign-in page.
      if (location.pathname === '/login') return
      // Otherwise, render button.
      return <Button
        variant='contained'
        color='primary'
        component={RouterLink} to='/login'>
        Sign in
      </Button>
    }
    // If user is signed-in, render drop-down menu.
    return <DropDownMenu className={classes.menu} logoutHandler={logoutHandler} voteHandler={voteHandler} settingsHandler={settingsHandler}/>
  }

  return (
    <div className={classes.root}>
      <AppBar position='static' color='default'>
        <Toolbar>
          <Typography variant='h6' component='h1' className={classes.title}>
            RankMyWriting
          </Typography>
          {
            !isSignedIn() ? (
              <nav className={classes.nav}>
                <Link
                  variant='button'
                  className={classes.navLink}
                  component={RouterLink} to='/'>
                  Home
                </Link>
                {renderButtonOrMenu()}
              </nav>
            ) : (
              <nav className={classes.nav}>
                <Link
                  variant='button'
                  className={classes.navLink}
                  component={RouterLink} to='/dashboard'>
                  Dashboard
                </Link>
                {/*Don't show button on smaller screens.*/} 
                {aboveSm && 
                  <Button
                    className={classes.voteButton}
                    variant='outlined'
                    color='secondary'
                    disableElevation
                    disableRipple
                    disableFocusRipple
                    component={RouterLink} to='/vote'>
                    Vote
                  </Button>
                }
                {renderButtonOrMenu()}
              </nav>
            )
          }

        </Toolbar>
      </AppBar>
    </div>
  );
}
