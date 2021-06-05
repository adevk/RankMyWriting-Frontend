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

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  link: {
    marginRight: theme.spacing(2),
    color: 'primary'
  }
}));



export default function MyAppBar() {
  const classes = useStyles()
  const location = useLocation()
  console.log(location.pathname)

  const logoutHandler = () => {
    localStorage.removeItem('authToken')
    // Refresh page and update states.
    window.location.reload(false)
  }

  const renderButton = () => {
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

    // If user is signed in, render logout button.
    return <Button
      onClick={ logoutHandler }
      variant='contained'
      color='primary'
      component={RouterLink} to='/'>
      Sign out
    </Button>
  }

  return (
    <div className={classes.root}>
      <AppBar position='static' color='default'>
        <Toolbar>
          <Typography variant='h6' className={classes.title}>
            RankMyWriting
          </Typography>
          <nav>
            <Link
              variant='button'
              className={classes.link}
              component={RouterLink} to='/'>
                Home
            </Link>
          </nav>
          {renderButton()}
        </Toolbar>
      </AppBar>
    </div>
  );
}
