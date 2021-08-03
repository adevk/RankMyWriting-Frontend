import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { Container, Box, Typography, Divider } from '@material-ui/core'

import DeleteAccountDialogButton from './DeleteAccountDialogButton'

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(4, 2)
  },
  deleteButton: {
    color: theme.palette.error.contrastText,
    backgroundColor: theme.palette.error.main,
    '&:hover': {
      backgroundColor: theme.palette.error.dark
    }
  }
}))

/**
 * The dasboard page component.
 *
 * @component
 */
const Settings = () => {
  const classes = useStyles()

  return (
    <Container className={classes.container} maxWidth='xs'>
      <Typography variant='h3' component='h1' align='center' gutterBottom>Settings</Typography>
      <Typography variant='h4' component='h2' align='center' gutterBottom>Delete Account</Typography>
      <Divider/>
      <Box mt={1} display='flex' flexDirection='column' alignItems='center'>
          <Typography variant='h5' component='h2' gutterBottom>Do you want to delete your account?</Typography>
          <DeleteAccountDialogButton/>
      </Box>
    </Container>
  )
}

export default Settings
