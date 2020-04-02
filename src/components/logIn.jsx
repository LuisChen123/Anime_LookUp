import React, { useState, useEffect } from 'react';
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
import MuiAlert from '@material-ui/lab/Alert';
import Axios from 'axios';
import Md5 from 'md5';
import store from '../store';
import { getUserLogin, handleStoreUserInfo } from '../store/actionCreator';

// alert component
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

// css style
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

export default function Login() {
  const classes = useStyles();
  // state
  const [value, setValue] = useState({
    userName: '',
    passWord: '',
    showPassWord: false,
    userNameError: false,
    passWordError: false,
    userNameEmptyMessage: '',
    passWordEmptyMessage: '',
    userNameOrPassWordErrorMessage,
    patt: new RegExp(
      '^.*(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!.?|~])[a-zA-Z0-9@#$%^&+=!.?|~]*$'
    ),
    isLogin: true
  });

  const {
    userName,
    passWord,
    userNameError,
    passWordError,
    userNameOrPassWordErrorMessage
  } = value;

  // snackbar state/postion control
  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center'
  });

  // shotcut
  const { vertical, horizontal, open } = state;

  // handle alert popup
  const handleClick = () => {
    setState({ open: true, vertical: 'top', horizontal: 'center' });
  };
  // handle alert close
  const handleClose = () => {
    setState({ ...state, open: false });
  };

  // handle user name/password
  const handleChange = type => event => {
    setValue({ ...value, [type]: event.target.value });
  };

  // handle show or hide password
  const handleClickShowPasword = () => {
    setValue({ ...value, showPassWord: !value.showPassWord });
  };

  const handleUserNameRule = () => {
    if (userName.trim() === '') {
      setValue({
        ...value,
        userNameEmptyMessage: 'username can`t be empty!',
        userNameError: true
      });
    } else {
      setValue({
        ...value,
        userNameEmptyMessage: '',
        userNameError: false
      });
    }
  };

  const handlePasswordRule = () => {
    if (value.passWord.trim() === '') {
      setValue({
        ...value,
        passWordEmptyMessage: 'password can`t be empty',
        passWordError: true
      });
    } else {
      setValue({
        ...value,
        passWordEmptyMessage: '',
        passWordError: false
      });
    }
  };

  const handleSubmitCheck = () => {
    if (userName.trim() === '') {
      setValue({
        ...value,
        userNameEmptyMessage: 'username can`t be empty!',
        userNameError: true
      });
    } else {
      setValue({
        ...value,
        userNameEmptyMessage: '',
        userNameError: false
      });
    }
    if (passWord.trim() === '') {
      setValue({
        ...value,
        passWordEmptyMessage: 'password can`t be empty',
        passWordError: true
      });
    } else {
      setValue({
        ...value,
        passWordEmptyMessage: '',
        passWordError: false
      });
    }
  };

  // disable default
  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  // use redux to change login status
  const handleUserLogin = () => {
    const action = getUserLogin(value.isLogin);
    store.dispatch(action);
  };

  // store user info in the Redux;
  const handleStoreInfo = userInfo => {
    const action = handleStoreUserInfo(userInfo);
    store.dispatch(action);
  };

  const handleSubmit = () => {
    handleSubmitCheck();
    if (userNameError === false && passWordError === false && passWord !== '' && userName !== '') {
      Axios.post('/login', {
        username: userName.trim(),
        passWord: Md5(value.passWord)
      })
        .then(response => {
          console.log(response);
          switch (response.data.status) {
            case 0:
              console.log('there is no such user');
              break;
            case 1:
              console.log('password is not correct');
              break;
            case 2:
              console.log('password is correct');
              // store user info in the Redux
              handleStoreInfo(response.data.result);
              // change isLogin in Globe
              handleUserLogin();
              break;
            case 3:
              console.log('means there is something wrong with database');
              break;
            default:
              console.log('something is wroing');
          }
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      handleClick();
      setValue({
        userNameOrPassWordErrorMessage: 'please fix error before submit!'
      });
    }
  };

  return (
    <div className={classes.root}>
      <Grid container direction="column" justify="center" alignItems="center" spacing={3}>
        <Grid item xs={1} sm={3} />
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          key={`${vertical},${horizontal}`}
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
        >
          <Alert severity="error">{value.userNameOrPassWordErrorMessage}</Alert>
        </Snackbar>
        <Grid item xs={10} sm={6}>
          <Paper className={classes.paper}>
            <Typography variant="h4" component="h4" align="center">
              Login
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
                  autoComplete="current-username"
                  onChange={handleChange('userName')}
                  onKeyUp={handleUserNameRule}
                  error={value.userNameError}
                  helperText={value.userNameError ? value.userNameEmptyMessage : null}
                  shrink="true"
                />
                <TextField
                  required
                  fullWidth
                  id="filled-password-input"
                  label="Password"
                  type={value.showPassWord ? 'text' : 'password'}
                  autoComplete="current-password"
                  variant="filled"
                  error={value.passWordError}
                  helperText={value.passWordError ? value.passWordEmptyMessage : null}
                  onChange={handleChange('passWord')}
                  onKeyUp={handlePasswordRule}
                  shrink="true"
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
              </div>
            </form>
            <div className={classes.Lines}>
              <Link to="/register" className={classes.LinkStyle}>
                Register
              </Link>
              <Button variant="contained" color="primary" onClick={handleSubmit}>
                Login
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
