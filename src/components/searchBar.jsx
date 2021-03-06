import React, { useState } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import SendIcon from '@material-ui/icons/Send';
import IconButton from '@material-ui/core/IconButton';
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  },
  title: {
    display: 'none',
    width: '23%',
    [theme.breakpoints.up('xs')]: {
      display: 'block'
    }
  },
  search: {
    display: 'flex',
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: '80%'
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit',
    width: '100%'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '100%'
    }
  },
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2)
    }
  }
}));

export default function SearchBar(props) {
  const classes = useStyles();
  // const [inputValue, setInputValue] = useState('');
  // const [anchorEl, setAnchorEl] = React.useState(null);
  const [value, setValue] = useState({
    inputValue: '',
    anchorEl: null,
    userName: 'Luis'
  });

  const handleClick = event => {
    setValue({
      ...value,
      anchorEl: event.currentTarget
    });
  };

  const handleClose = () => {
    // setAnchorEl(null);
    setValue({
      ...value,
      anchorEl: null
    });
  };

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            Anime Name:
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="type something to start search"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={e => setValue({ inputValue: e.target.value })}
              onKeyUp={() => props.handleSearch(value.inputValue)}
              value={value.inputValue}
            />
          </div>
          <IconButton aria-label="send" onClick={() => props.handleButtonSend()}>
            <SendIcon color="secondary" />
          </IconButton>
          <IconButton
            color="secondary"
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={value.anchorEl}
            keepMounted
            open={Boolean(value.anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>{value.userName}</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <div className={classes.root}>
        <LinearProgress color="secondary" variant={props.waitReturn ? 'indeterminate' : null} />
      </div>
    </div>
  );
}
