import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { Card, CardContent, Typography, Divider } from '@material-ui/core'

import ScoreRow from './ScoreRow.js'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2)
  },
  topPart: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  textPart: {
    overflow: 'scroll',
    height: '200px'
  },
  scoreRow: {
    display: 'flex',
    justifyContent: 'space-between'
  }
}))

/**
 * A card used to show a writing in the dashboard.
 *
 * @component
 */
const WritingCard = ({ title, text, votes, score }) => {
  const classes = useStyles()

  return (
    <Card className={classes.root}>
      <CardContent>
        <div className={classes.topPart}>
          <Typography variant='h6'>{title}</Typography>
          <Typography variant='subtitle1' color='primary'>{votes} {votes === 1 ? 'vote' : 'votes'}</Typography>
        </div>
        <Divider className={classes.divider}/>
        <Typography className={classes.textPart} variant='body2' color='textSecondary' noWrap={false} gutterBottom>
          {text}
        </Typography>
        <Divider className={classes.divider}/>
        <div className={classes.scorePart}>
          <ScoreRow score={Math.round(score.comprehensible)}>Comprehensible</ScoreRow>
          <ScoreRow score={Math.round(score.engaging)}>Enganging</ScoreRow>
          <ScoreRow score={Math.round(score.convincing)}>Convincing</ScoreRow>
        </div>
      </CardContent>
    </Card>
  )
}

WritingCard.propTypes = {
  /** The title of the writing. */
  title: PropTypes.string.isRequired,

  /** The writing's text. */
  text: PropTypes.string.isRequired,

  /** The number of votes the writing has received. */
  votes: PropTypes.number.isRequired,

  /** The average scores of all the attributes. */
  score: PropTypes.object.isRequired
}

export default WritingCard
