import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import {Button} from "@material-ui/core";
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import { Link as RouterLink } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  heroContent: {
    padding: theme.spacing(6, 0)
  }
}));

export default function Home() {
  const classes = useStyles();

  return (
    <div className={classes.heroContent}>
      <Container maxWidth='sm'>
        <Typography variant='h2' align='center' gutterBottom>Heading</Typography>
        <Typography variant='body1' align='center' paragraph gutterBottom>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Typography>
        <Grid container justify="center">
          <Grid item>
            <Button variant='contained' color='primary' component={RouterLink} to='/register'>
              Sign up
            </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}