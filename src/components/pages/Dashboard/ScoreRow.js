import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between'
  }
}))

const ScoreRow = (props) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Typography variant='subtitle' component='span' color='primary'>
        {props.children}
      </Typography>
      <Typography variant='subtitle' component='span' color='primary'>
        {props.score === 0 ? 'no votes' : `${props.score} / 5`}
      </Typography>
    </div>
  )
}

export default ScoreRow