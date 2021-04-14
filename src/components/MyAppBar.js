import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link'
import { Link as RouterLink } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  link: {
    marginRight: theme.spacing(2),
    color: 'white'
  }
}));

// Example from material-ui.com
export default function MyAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
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
            <Button
              variant='contained'
              color="secondary"
              component={RouterLink} to='/login'>
                Login
            </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
