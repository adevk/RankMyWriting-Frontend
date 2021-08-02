import { useState } from 'react'
import { useHistory } from 'react-router'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core'

import axios from 'axios'

import { useAppContext } from '../../../AppContext.js'
import { deleteAuthToken, getAuthToken } from '../../../helper-functions.js'

const useStyles = makeStyles((theme) => ({
  deleteButton: {
    color: theme.palette.error.contrastText,
    backgroundColor: theme.palette.error.main,
    '&:hover': {
      backgroundColor: theme.palette.error.dark
    }
  },
  confirmDeletionButton: {
    color: theme.palette.error.main,
    '&:hover': {
      color: theme.palette.error.dark,
    }
  }
}))

const DeleteAccountDialog = () => {
  const [open, setOpen] = useState(false)
  const classes = useStyles()
  const history = useHistory()
  const appContext = useAppContext()


  const handleClickOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${appContext.apiURL}/users/delete`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getAuthToken()}`
          }
        }
      )
      // If account deletion was successful.
      if (response.data.success) {
        // Sign out.
        logoutHandler()
      }
    } catch (error) {
      console.log(error.message)
    }
    handleClose()
  }

  const logoutHandler = () => {
    deleteAuthToken()
    history.push({
      pathname: '/home',
      state: { redirection: true, message: 'Your account has been deleted successfully.' }
    })
 }

  return (
    <div>
      <Button className={classes.deleteButton} variant='contained' onClick={handleClickOpen}>
        Delete Account
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>Are you sure?</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Are you sure you want to delete your account? All your writings and data will be permanently deleted. This cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleDelete} className={classes.confirmDeleteBtn} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default DeleteAccountDialog