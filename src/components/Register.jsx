import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import Snackbar from '@material-ui/core/Snackbar';
import Fade from '@material-ui/core/Fade';
import Slide from '@material-ui/core/Slide';
import Grow from '@material-ui/core/Grow';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(1),
    '& .MuiTextField-root': {
      margin: theme.spacing(1)
    }
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  LinkStyle: {
    cursor: 'pointer'
  },
  Lines: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'baseline'
  },
  closeLines: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginTop: 0,
    marginBottom: 0,
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  }
}));

export default function Register() {
  const classes = useStyles();

  const [value, setValue] = useState({
    userName: '',
    passWord: '',
    comfirmPassword: '',
    age: '',
    showPassWord: false,
    showComfirmPassWord: false,
    isUserNameCorrect: false,
    isPasswordCorrect: false,
    isAgeCorrect: false,
    userNameErrorMessage: '',
    passwordErrorMessage: '',
    ageErrorMessage: '',
    patt: new RegExp(
      '^.*(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!.?|~])[a-zA-Z0-9@#$%^&+=!.?|~]*$'
    )
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
        isUserNameCorrect: true
      });
    } else if (value.userName.trim().length > 6 || value.userName.trim.length === 6) {
      setValue({
        ...value,
        userNameErrorMessage: '',
        isUserNameCorrect: false
      });
    }
  };

  const hanldPasswordRule = () => {
    if (value.passWord.trim() !== value.comfirmPassword.trim()) {
      setValue({
        ...value,
        isPasswordCorrect: true,
        passwordErrorMessage: 'you must enter same passwords!'
      });
    } else if (
      value.patt.test(value.passWord) === false ||
      value.patt.test(value.comfirmPassword) === false
    ) {
      setValue({
        ...value,
        isPasswordCorrect: true,
        passwordErrorMessage:
          'PassWord must contain at least 8 chararters, and include at least one capital letter,one low case letter,one number and one special character'
      });
    } else if (value.passWord.trim() === value.comfirmPassword.trim()) {
      setValue({
        ...value,
        isPasswordCorrect: false,
        passwordErrorMessage: ''
      });
    }
  };

  const handleAgeRule = () => {
    if (value.age < 18) {
      setValue({
        ...value,
        isAgeCorrect: true,
        ageErrorMessage: 'Sorry, You must older than 18 years old to view this website.'
      });
    } else if (value.age > 99) {
      setValue({
        ...value,
        isAgeCorrect: true,
        ageErrorMessage: 'Sorry, You must younger than 100 years old to view this website.'
      });
    } else {
      setValue({
        ...value,
        isAgeCorrect: false,
        ageErrorMessage: ''
      });
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (
      value.isAgeCorrect === false &&
      value.isPasswordCorrect === false &&
      value.isUserNameCorrect === false
    ) {
      // doing ajax here
    } else {
      // alert something
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
                  id="filled-required"
                  label="User Name"
                  variant="filled"
                  color="primary"
                  value={value.userName.trim()}
                  onChange={handleChange('userName')}
                  error={value.isUserNameCorrect}
                  helperText={value.isUserNameCorrect ? value.userNameErrorMessage : null}
                  onKeyUp={handleUserNameRule}
                />
                <TextField
                  required
                  fullWidth
                  id="filled-password-input"
                  label="Password"
                  type={value.showPassWord ? 'text' : 'password'}
                  autoComplete="current-password"
                  variant="filled"
                  error={value.isPasswordCorrect}
                  helperText={value.isPasswordCorrect ? value.passwordErrorMessage : null}
                  onChange={handleChange('passWord')}
                  onKeyUp={hanldPasswordRule}
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
                  helperText={value.isPasswordCorrect ? value.passwordErrorMessage : null}
                  onChange={handleChange('comfirmPassword')}
                  onKeyUp={hanldPasswordRule}
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
                  error={value.isAgeCorrect}
                  onChange={handleChange('age')}
                  onKeyUp={handleAgeRule}
                  helperText={value.ageErrorMessage}
                />
              </div>
            </form>
            <div className={classes.Lines}>
              <Link to="/login" className={classes.LinkStyle}>
                Log in
              </Link>
              <Button variant="contained" color="primary" onClick={handleSubmit}>
                Submit
              </Button>
            </div>
            <div className={classes.breakLine} />
            <div className={classes.closeLines}>
              <IconButton aria-label="GitHub Account">
                <GitHubIcon />
              </IconButton>
              <IconButton aria-label="FaceBook Account">
                <FacebookIcon />
              </IconButton>
              <IconButton aria-label="Google Account">
                <InstagramIcon />
              </IconButton>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={1} sm={3} />
      </Grid>
    </div>
  );
}
