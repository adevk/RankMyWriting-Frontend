import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Divider } from '@material-ui/core'

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
  }
}))

export default function TextCard({title, votes, text}) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <div className={classes.cardHeading}></div>
      <CardContent>
        <div className={classes.topPart}>
          <Typography variant="h6">{title}</Typography>
          <Typography variant="subtitle1" color="primary">{votes} votes</Typography>
        </div>
        <Divider className={classes.divider}/>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sit amet congue erat, tincidunt porttitor nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam finibus sapien ex, id fermentum lacus venenatis et. Nullam vel imperdiet erat. Cras vel sagittis sapien, sit amet hendrerit justo. Maecenas id tempor arcu, sit amet viverra neque. Etiam scelerisque lacus a vestibulum pharetra. Morbi eu arcu id ex dictum lobortis at hendrerit augue. Donec tincidunt laoreet leo, vel semper nulla. Praesent malesuada mi in justo malesuada posuere. Praesent consequat varius luctus. Donec hendrerit turpis eget luctus aliquam.
        </Typography>
      </CardContent>
    </Card>

  );
}
