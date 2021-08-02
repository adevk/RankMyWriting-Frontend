import { Link as RouterLink } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { Typography, Link, Button } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(4)
  }
}))


const TopSection = ({points}) => {
  const classes = useStyles()

  return (
    <div id='topSection' className={classes.root}>
      <div id='textGroup'>
        <Typography variant='h6' color='textPrimary'>
          Points: {points}
        </Typography>
        <Link component={RouterLink} to='/vote'color='secondary' underline='always'>
          Vote and get more
        </Link>
      </div>

      <RouterLink to='/upload-writing'>
        <Button variant='contained'color='primary'>
          Add Writing
        </Button>
      </RouterLink>
    </div>
  )
}

export default TopSection
