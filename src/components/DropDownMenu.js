import React, { useState } from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import SettingsIcon from '@material-ui/icons/Settings'
import useMediaQuery from '@material-ui/core/useMediaQuery';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'inline-block',
  },
  menuIconButton: {
    padding: 0
  }
}))

export default function SimpleMenu(props) {
  const aboveSm = useMediaQuery(theme => theme.breakpoints.up('sm'));

  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  return (
    <div className={classes.root}>
      <IconButton
        className={classes.menuIconButton}
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <SettingsIcon color='primary'/>
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        onClick={handleClose}
      >
        {!aboveSm && 
          <MenuItem onClick={props.voteHandler}>Vote</MenuItem>
        }
        <MenuItem onClick={props.settingsHandler}>Settings</MenuItem>
        <MenuItem onClick={props.logoutHandler}>Sign out</MenuItem>
      </Menu>
    </div>
  )
}
