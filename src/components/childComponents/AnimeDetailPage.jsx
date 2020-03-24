import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  informationBox: {
    listStyle: 'none',
    paddingInlineStart: 0
  },
  lineTitleStyle: {
    fontWeight: 'bold',
    fontStyle: 'italic',
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    width: '30%'
  },
  line: {
    display: 'flex',
    justifyContent: 'left',
    margin: theme.spacing(1),
    padding: theme.spacing(1),
    color: 'black',
    alignItems: 'baseline',
    '&:nth-child(odd)': {
      background: '#ececec'
    }
  },
  lineItems: {
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    textAlign: 'start',
    width: '70%'
  },
  imgs: {
    border: '1px solid #ddd',
    borderRadius: theme.spacing(1),
    padding: theme.spacing(1),
    width: theme.spacing(20)
  },
  mediaBox: {},
  picBox: {
    borderBottom: '1px black solid',
    padding: '10px 0',
    '&imgs:hover': {
      boxShadow: '0 0 2px 1px rgba(0, 140, 186, 0.5)'
    }
  },
  videBox: {}
}));

export default function AnimeDetailPage(props) {
  const classes = useStyles();
  const [value, setValue] = useState({
    API: 'https://api.jikan.moe/v3/anime/',
    AnimeId: '',
    Bundle: {},
    aired: {},
    autoplay: '&autoplay=0'
  });

  useEffect(() => {
    // get Anime data from Api
    Axios.get(`${value.API}${props.match.params.id}`)
      .then(function(response) {
        console.log(response);
        setValue({
          Bundle: response.data,
          aired: response.data.aired
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }, []);

  const {
    title,
    title_japanese,
    type,
    source,
    episodes,
    status,
    duration,
    rating,
    score,
    scored_by,
    rank,
    popularity,
    members,
    favorites,
    synopsis,
    background,
    premiered,
    broadcast,
    image_url,
    trailer_url
  } = value.Bundle;
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={1} sm={1} />
        <Grid item xs={10} sm={10}>
          <Paper className={classes.paper}>
            <div className={classes.picBox}>
              <img className={classes.imgs} src={image_url} alt="pic" />
            </div>
            <div className={classes.videBox}>
              <iframe
                src={trailer_url + '/' + value.autoplay}
                allowFullScreen={true}
                title="trailer"
                frameBorder="0"
              />
            </div>

            <ul className={classes.informationBox}>
              <li className={classes.line}>
                <span className={classes.lineTitleStyle}>Title:</span>
                <span className={classes.lineItems}>{title}</span>
              </li>
              <li className={classes.line}>
                <span className={classes.lineTitleStyle}>Japanese:</span>
                <span className={classes.lineItems}>{title_japanese}</span>
              </li>
              <li className={classes.line}>
                <span className={classes.lineTitleStyle}>Type:</span>
                <span className={classes.lineItems}>{type}</span>
              </li>
              <li className={classes.line}>
                <span className={classes.lineTitleStyle}>Episodes:</span>
                <span className={classes.lineItems}>{episodes}</span>
              </li>
              <li className={classes.line}>
                <span className={classes.lineTitleStyle}>Source:</span>
                <span className={classes.lineItems}>{source}</span>
              </li>
              <li className={classes.line}>
                <span className={classes.lineTitleStyle}>status:</span>
                <span className={classes.lineItems}>{status}</span>
              </li>
              <li className={classes.line}>
                <span className={classes.lineTitleStyle}>Aired:</span>
                <span className={classes.lineItems}>{value.aired.string}</span>
              </li>
              <li className={classes.line}>
                <span className={classes.lineTitleStyle}>duration:</span>
                <span className={classes.lineItems}>{duration}</span>
              </li>
              <li className={classes.line}>
                <span className={classes.lineTitleStyle}>Source:</span>
                <span className={classes.lineItems}>{source}</span>
              </li>
              <li className={classes.line}>
                <span className={classes.lineTitleStyle}>rating:</span>
                <span className={classes.lineItems}>{rating}</span>
              </li>
              <li className={classes.line}>
                <span className={classes.lineTitleStyle}>score:</span>
                <span className={classes.lineItems}>{score}</span>
              </li>
              <li className={classes.line}>
                <span className={classes.lineTitleStyle}>scored by:</span>
                <span className={classes.lineItems}>{scored_by}</span>
              </li>
              <li className={classes.line}>
                <span className={classes.lineTitleStyle}>rank:</span>
                <span className={classes.lineItems}>{rank}</span>
              </li>
              <li className={classes.line}>
                <span className={classes.lineTitleStyle}>popularity:</span>
                <span className={classes.lineItems}>{popularity}</span>
              </li>
              <li className={classes.line}>
                <span className={classes.lineTitleStyle}>members:</span>
                <span className={classes.lineItems}>{members}</span>
              </li>
              <li className={classes.line}>
                <span className={classes.lineTitleStyle}>popularity:</span>
                <span className={classes.lineItems}>{popularity}</span>
              </li>
              <li className={classes.line}>
                <span className={classes.lineTitleStyle}>favorites:</span>
                <span className={classes.lineItems}>{favorites}</span>
              </li>
              <li className={classes.line}>
                <span className={classes.lineTitleStyle}>synopsis:</span>
                <span className={classes.lineItems}>{synopsis}</span>
              </li>
              <li className={classes.line}>
                <span className={classes.lineTitleStyle}>background:</span>
                <span className={classes.lineItems}>{background}</span>
              </li>
              <li className={classes.line}>
                <span className={classes.lineTitleStyle}>premiered:</span>
                <span className={classes.lineItems}>{premiered}</span>
              </li>
              <li className={classes.line}>
                <span className={classes.lineTitleStyle}>broadcast:</span>
                <span className={classes.lineItems}>{broadcast}</span>
              </li>
            </ul>
          </Paper>
        </Grid>
        <Grid item xs={1} sm={10} />
      </Grid>
    </div>
  );
}
