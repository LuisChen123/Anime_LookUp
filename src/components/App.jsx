import React, { useState, useEffect } from 'react';

import Axios from 'axios';

import { makeStyles, Typography, Paper, Divider, Grid } from '@material-ui/core';

import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';

import SearchBar from './SearchBar';

import AnimeCardsBox from './AnimeCardsBox';

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

export default function App(props) {
  const classes = useStyles();
  const [keyWord, setKeyWord] = useState('');
  const [returnedData, setReturnedData] = useState([]);
  const [cardNumbers, setCardNumbers] = useState(16);
  const [wait, setWait] = useState(false);

  useEffect(() => {
    console.log(props);
  }, []);

  const getAnimatData = () => {
    Axios.get(`https://api.jikan.moe/v3/search/anime?q=${keyWord}&limit=${cardNumbers}`)
      .then(response => {
        setWait(false);
        setReturnedData(response.data.results);
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleButtonSend = inputValue => {
    setKeyWord(inputValue);
    if (keyWord.length < 3) {
      window.alert('key word must longer then 2 char');
    } else {
      setWait(true);
      getAnimatData();
    }
  };

  const handleKeyUp = inputValue => {
    setKeyWord(inputValue);
    if (window.event.keyCode === 13 && keyWord.length < 3) {
      window.alert('key word must longer then 2 char');
    } else if (window.event.keyCode === 13 && keyWord.length > 0) {
      setWait(true);
      getAnimatData();
    }
  };

  return (
    <div>
      {/* <Typography className={classes.Bolder} variant="h4" align="center" color="primary">
        My Anime List
      </Typography> */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <SearchBar
            handleSearch={handleKeyUp}
            handleButtonSend={handleButtonSend}
            waitReturn={wait}
          />
        </Grid>
        <Grid item xs={1} />
        <Grid item xs={10}>
          <Paper className={classes.paper}>
            {/* show the anime list or show not happy icon */}
            {returnedData.length > 0 ? (
              <AnimeCardsBox animatData={returnedData} history={props.history} />
            ) : (
              <SentimentVeryDissatisfiedIcon />
            )}
          </Paper>
        </Grid>
        <Grid item xs={1} />
      </Grid>
      <Divider className={classes.divider} />
    </div>
  );
}
