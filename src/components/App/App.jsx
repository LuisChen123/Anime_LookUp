import React, { useState, useEffect } from 'react';

import Axios from 'axios';

import { makeStyles, Typography, Paper, Divider, Grid } from '@material-ui/core';

import SearchBar from '../searchBar';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: theme.spacing(3)
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    marginBottom: theme.spacing(1)
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  Bolder: {
    fontWeight: 'bolder'
  }
}));

export default function CSSGrid() {
  const classes = useStyles();
  const [keyWord, setKeyWord] = useState('');
  const [returnDataNumber, setReturnDataNumber] = useState(16);

  const getAnimatData = () => {
    Axios.get(`https://api.jikan.moe/v3/search/anime?q=${keyWord}&limit=${returnDataNumber}`)
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {}, [keyWord]);

  const handleButtonSend = () => {
    if (keyWord === '') {
      window.alert('entry something');
    } else {
      getAnimatData();
    }
  };

  const handleKeyDown = inputValue => {
    setKeyWord(inputValue);
    console.log(typeof inputValue);
    if (window.event.keyCode === 13 && keyWord === '') {
      window.alert('entry something');
    } else if (window.event.keyCode === 13 && keyWord !== '') {
      getAnimatData();
    }
  };

  return (
    <div>
      <Typography className={classes.Bolder} variant="h1" align="center" color="primary">
        My Anime List
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <SearchBar handleSearch={handleKeyDown} handleButtonSend={handleButtonSend} />
        </Grid>
        <Grid item xs={2}>
          <Paper className={classes.paper}>xs=4</Paper>
        </Grid>
        <Grid item xs={8}>
          <Paper className={classes.paper}>xs=8</Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper className={classes.paper}>xs=4</Paper>
        </Grid>
      </Grid>
      <Divider className={classes.divider} />
    </div>
  );
}
