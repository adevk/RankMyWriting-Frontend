import { useState } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { useHistory } from 'react-router'

import axios from 'axios'

import { useAppContext } from '../../../AppContext.js'

const useStyles = makeStyles((theme) => ({
  deleteButton: {
    color: theme.palette.error.contrastText,
    backgroundColor: theme.palette.error.main,
    '&:hover': {
      backgroundColor: theme.palette.error.dark
    }
  },
  confirmDeleteBtn: {
    color: theme.palette.error.main,
    '&:hover': {
      color: theme.palette.error.dark,
    }
  }
}));

export default function DeleteAccountDialog() {
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
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`
          }
        }
      )
      if (response.data.success) {
        logoutHandler()
      }
    } catch (error) {
      console.log(error.message)
    }
    handleClose()
  }

  const logoutHandler = () => {
    localStorage.removeItem('authToken')
    history.push({
      pathname: '/home',
      state: { loggedOut: true, message: "You're account has been deleted successfully." }
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
  );
}