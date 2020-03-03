import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core';

import AnimeCards from './childComponents/AnimeCards';

const useStyles = makeStyles(theme => ({
  boxLayout: {
    display: 'flex',
    flexFlow: 'wrap',
    justifyContent: 'space-around'
  }
}));

export default function AnimeCardsBox(props) {
  const classes = useStyles();

  return (
    <div className={classes.boxLayout}>
      {props.animatData.map(item => {
        return <AnimeCards animatData={item} key={item.mal_id} />;
      })}
    </div>
  );
}
