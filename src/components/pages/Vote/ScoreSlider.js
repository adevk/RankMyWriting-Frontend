import withStyles from '@material-ui/core/styles/withStyles'
import Slider from '@material-ui/core/Slider'

export const ScoreSlider = withStyles({
  root: {
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 8,
  },
  rail: {
    height: 8,
  },
  mark: {
    height: 8,
  },
})(Slider)