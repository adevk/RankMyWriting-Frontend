import { React } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link'
import { Link as RouterLink } from 'react-router-dom'
import { isSignedIn } from '../helper.js'
import { useLocation } from 'react-router'
import DropDownMenu from './DropDownMenu'

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
  console.log(location.pathname)

  const logoutHandler = () => {
    localStorage.removeItem('authToken')
    // Refresh page and update states.
    window.location.reload(false)
  }

  const renderButtonOrMenu = () => {
    // If user is not signed in, render sign-in button.
    if (!isSignedIn()) {
      // Don't render button if current page is sign-in page.
      if (location.pathname === '/login') return
      return <Button
        variant='contained'
        color='primary'
        component={RouterLink} to='/login'>
        Sign in
      </Button>
    }

    return <DropDownMenu className={classes.menu} logoutHandler={logoutHandler}/>
  }

  return (
    <div className={classes.root}>
      <AppBar position='static' color='default'>
        <Toolbar>
          <Typography variant='h6' className={classes.title}>
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
                {renderButtonOrMenu()}
              </nav>
            )
          }

        </Toolbar>
      </AppBar>
    </div>
  );
}
