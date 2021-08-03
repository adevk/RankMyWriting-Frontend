import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Menu, MenuItem, IconButton, Hidden } from '@material-ui/core'
import SettingsIcon from '@material-ui/icons/Settings'


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'inline-block',
  },
  menuIconButton: {
    padding: 0
  }
}))

/**
 * A drop-down menu.
 * 
 * @component
 * 
 * @property {function} logoutHandler - Handles logging out.
 * @property {function} settingsHandler - Redirects to settings page.
 * @property {function} voteHandler - Redirects to voting page.
 */
const DropDownMenu = ({logoutHandler, settingsHandler, voteHandler}) => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div className={classes.root}>
      <IconButton
        className={classes.menuIconButton}
        aria-label='more'
        aria-controls='long-menu'
        aria-haspopup='true'
        onClick={handleClick}>
          <SettingsIcon color='primary'/>
      </IconButton>
      <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        onClick={handleClose}>
        {/*Only show vote menu-item on smaller screens.*/}
        <Hidden smUp>
          <MenuItem onClick={voteHandler}>Vote</MenuItem>
        </Hidden>
        <MenuItem onClick={settingsHandler}>Settings</MenuItem>
        <MenuItem onClick={logoutHandler}>Sign out</MenuItem>
      </Menu>
    </div>
  )
}

export default DropDownMenu