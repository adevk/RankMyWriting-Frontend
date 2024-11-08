import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between'
  }
}))

/**
 * A score row used to show a score inside the writing cards.
 *
 * @component
 */
const ScoreRow = ({ children, score }) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Typography variant='subtitle' component='span' color='primary'>
        {children}
      </Typography>
      <Typography variant='subtitle' component='span' color='primary'>
        {score === 0 ? 'no votes' : `${score} / 5`}
      </Typography>
    </div>
  )
}

ScoreRow.propTypes = {
  /** The name of the attribute to show a score for. */
  children: PropTypes.string.isRequired,

  /** The score of the attribute. */
  score: PropTypes.number.isRequired
}

export default ScoreRow
