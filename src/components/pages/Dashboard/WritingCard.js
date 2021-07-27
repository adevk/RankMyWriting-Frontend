import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Divider } from '@material-ui/core'

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
  scoreRow: {
    display: 'flex',
    justifyContent: 'space-between'
  }
}))

export default function WritingCard({title, text, votes, score}) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <div className={classes.cardHeading}></div>
      <CardContent>
        <div className={classes.topPart}>
          <Typography variant="h6">{title}</Typography>
          <Typography variant="subtitle1" color="primary">{votes} {votes === 1 ? 'vote' : 'votes'}</Typography>
        </div>
        <Divider className={classes.divider}/>
        <Typography variant="body2" color="textSecondary" gutterBottom>
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
  );
}
