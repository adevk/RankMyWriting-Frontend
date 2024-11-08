import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { Menu, MenuItem, IconButton, Hidden } from '@material-ui/core'
import SettingsIcon from '@material-ui/icons/Settings'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'inline-block'
  },
  menuIconButton: {
    padding: 0
  }
}))

/**
 * A drop-down menu.
 *
 * @component
 */
const DropDownMenu = ({ logoutHandler, settingsHandler, voteHandler }) => {
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
        {/* Only show vote menu-item on smaller screens. */}
        <Hidden smUp>
          <MenuItem onClick={voteHandler}>Vote</MenuItem>
        </Hidden>
        <MenuItem onClick={settingsHandler}>Settings</MenuItem>
        <MenuItem onClick={logoutHandler}>Sign out</MenuItem>
      </Menu>
    </div>
  )
}

DropDownMenu.propTypes = {
  /** The children elements to which the context should be available. */
  logoutHandler: PropTypes.func.isRequired,

  /** Redirects to settings page. */
  settingsHandler: PropTypes.func.isRequired,

  /** Redirects to voting page. */
  voteHandler: PropTypes.func.isRequired
}

export default DropDownMenu
