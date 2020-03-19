import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';

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

  const [value, setValue] = useState({
    userName: '',
    passWord: '',
    comfirmPassword: '',
    showPassWord: false,
    isUserNameError: false,
    showComfirmPassWord: false,
    isUserNameCorrect: false,
    isPasswordCorrect: false,
    userNameErrorMessage: '',
    passwordErrorMessage: ''
  });

  const handleChange = type => event => {
    setValue({ ...value, [type]: event.target.value });
  };

  const handleClickShowPasword = () => {
    setValue({ ...value, showPassWord: !value.showPassWord });
  };

  const handleClickShowComfirmPasword = () => {
    setValue({ ...value, showComfirmPassWord: !value.showComfirmPassWord });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const handleUserNameRule = () => {
    if (value.userName.trim().length < 6) {
      setValue({
        ...value,
        userNameErrorMessage: 'user name must longer then 6 characters',
        isUserNameError: true
      });
    } else if (value.userName.trim().length > 6 || value.userName.trim.length === 6) {
      setValue({
        ...value,
        userNameErrorMessage: '',
        isUserNameError: false
      });
    }
  };

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
                  error={value.isUserNameErro}
                  id="filled-required"
                  label="User Name"
                  variant="filled"
                  color="primary"
                  value={value.userName.trim()}
                  onChange={handleChange('userName')}
                  helperText={value.isUserNameCorrect ? null : value.userNameErrorMessage}
                  onKeyDown={handleUserNameRule}
                />
                <TextField
                  required
                  fullWidth
                  error={value.isPasswordCorrect}
                  id="filled-password-input"
                  label="Password"
                  type={value.showPassWord ? 'text' : 'password'}
                  autoComplete="current-password"
                  variant="filled"
                  helperText={value.isPasswordMeetReq ? null : value.passwordErrorMessage}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPasword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {value.showPassWord ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
                <TextField
                  required
                  fullWidth
                  error={value.isPasswordCorrect}
                  id="filled-password-input"
                  label="Comfirm-Password"
                  type={value.showComfirmPassWord ? 'text' : 'password'}
                  autoComplete="current-password"
                  variant="filled"
                  helperText={value.isPasswordMeetReq ? null : value.passwordErrorMessage}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowComfirmPasword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {value.showComfirmPassWord ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
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
