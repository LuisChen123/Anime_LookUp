import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginTop: '5vh',
    '& .MuiTextField-root': {
      margin: theme.spacing(1)
    }
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
}));

export default function Login() {
  const classes = useStyles();
  const [userName, setUserName] = useState('');
  const [passWord, setPassWord] = useState('');
  const [comfirmPassword, setComfirmPassworld] = useState('');
  const [isUserNameCorrect, setisUserNameCorrect] = useState(false);
  const [isPasswordError, setIsPassWordError] = useState(false);

  return (
    <div className={classes.root}>
      <Grid container direction="column" justify="center" alignItems="center" spacing={3}>
        <Grid item xs={1} sm={3} />
        <Grid item xs={10} sm={6}>
          <Paper className={classes.paper}>
            <Typography variant="h4" component="h4" align="center">
              Register
            </Typography>
            <form className={classes.root} autoComplete="off">
              <div>
                <TextField
                  required
                  fullWidth
                  id="filled-required"
                  label="User Name"
                  variant="filled"
                  color="primary"
                />
                <TextField
                  required
                  fullWidth
                  error={isPasswordError}
                  id="filled-password-input"
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  variant="filled"
                  helperText=""
                />
                <TextField
                  required
                  fullWidth
                  error={isPasswordError}
                  id="filled-password-input"
                  label="Comfirm-Password"
                  type="password"
                  autoComplete="current-password"
                  variant="filled"
                />
                <TextField
                  required
                  fullWidth
                  id="filled-number"
                  label="Age"
                  type="number"
                  InputLabelProps={{
                    shrink: true
                  }}
                  variant="filled"
                />
              </div>
            </form>
          </Paper>
        </Grid>
        <Grid item xs={1} sm={3} />
      </Grid>
    </div>
  );
}
