import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {Button} from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
    width: '40vw',
    margin: '20px auto'
  },
  formControl : {
    margin: '2px'
  }
}));

export default function BasicTextFields() {
  const classes = useStyles();

  return (
    <Paper variant="outlined" className={classes.root}>
      <form noValidate autoComplete="off" method='post' action='https://cscloud7-201.lnu.se/api/create'>
        <TextField className={classes.formControl} id="outlined-basic" label="Text" variant="outlined" name='content'/>
        <Button
          type='submit'
          variant="contained"
          color="primary"
          className={classes.formControl}
          endIcon={<Icon>send</Icon>}>
          Submit
        </Button>
      </form>
    </Paper>

  );
}
