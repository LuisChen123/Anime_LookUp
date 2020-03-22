import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
}));

export default function AnimeDetailPage(props) {
  const classes = useStyles();
  const [value, setValue] = useState({
    API: 'https://api.jikan.moe/v3/anime/',
    AnimeId: '',
    Bundle: {}
  });

  useEffect(() => {
    // get Anime data from Api
    Axios.get(`${value.API}${props.match.params.id}`)
      .then(function(response) {
        console.log(response);
        setValue({
          Bundle: response.data
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }, []);

  const { title } = value.Bundle;
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={1} sm={1} />
        <Grid item xs={10} sm={10}>
          <Paper className={classes.paper}>{title}</Paper>
        </Grid>
        <Grid item xs={1} sm={10} />
      </Grid>
    </div>
  );
}
