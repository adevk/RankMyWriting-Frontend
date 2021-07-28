import { React, useState, useEffect } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import { Link as RouterLink, Redirect, useLocation } from 'react-router-dom'
import { useHistory } from 'react-router-dom'

import axios from 'axios'

import { useAppContext } from '../../../AppContext.js'
import { isSignedIn } from '../../../helper-functions.js'
import { withSnackbar } from 'notistack'
import DeleteAccountDialog from './DeleteAccountDialog'

//TODO Give feedback messages on failed login.

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(4, 2),
  },
  deleteButton: {
    color: theme.palette.error.contrastText,
    backgroundColor: theme.palette.error.main,
    '&:hover': {
      backgroundColor: theme.palette.error.dark
    }
  }
}));



const Settings = (props) => {
  const appContext = useAppContext()
  const classes = useStyles()
  const history = useHistory()

  return !isSignedIn() ? (
    <Redirect to='/'/>
  ) : (
    <Container className={classes.container} maxWidth="xs">
      <Typography variant='h3' component='h1' align='center' gutterBottom>Settings</Typography>
      <Typography variant='h4' component='h2' align='center' gutterBottom>Delete Account</Typography>
      <Divider/>
      <Box mt={1} display='flex' flexDirection='column' alignItems='center'>
          <Typography variant='h5' component='h2' gutterBottom>Do you want to delete your account?</Typography>
            {/* <Button className={classes.deleteButton} variant='contained' onClick={deleteHandler}>Delete Account</Button> */}
            <DeleteAccountDialog></DeleteAccountDialog>
      </Box>
    </Container>
  )
}

export default Settings