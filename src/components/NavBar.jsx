import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import store from '../store';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  asd: {
    display: 'flex',
    justifyContent: 'space-between'
  }
}));

export default function NavBar(props) {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.asd}>
          <IconButton
            aria-label="ArrowBack"
            onClick={() => {
              props.history.history.goBack();
            }}
          >
            <ArrowBackIcon htmlColor="#fff" />
          </IconButton>

          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>My Anime</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            {store.getState().get('isLogin') ? (
              <MenuItem onClick={handleClose}>Log out</MenuItem>
            ) : (
              <MenuItem onClick={handleClose}>Log In</MenuItem>
            )}
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  );
}
