import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import CardActions from '@material-ui/core/CardActions';

import { useState } from 'react';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 345,
    width: 345,
    margin: theme.spacing(10, 0),
    position: 'relative'
  },
  media: {
    height: 140
  },
  autoWrap: {
    whiteSpace: 'normal',
    minHeight: 100
  },
  autoCenter: {
    justifyContent: 'space-around'
  },
  iconBox: {
    position: 'absolute',
    bottom: 0,
    width: '100%'
  }
}));

export default function AnimeCards(props) {
  const classes = useStyles();
  const [fav, setFav] = useState(false);

  const handleFav = id => {
    if (fav === true) {
      // send ajax to back end
      console.log('delete to database ' + id);
      setFav(!fav);
    } else {
      // send ajax to back end
      console.log('add to database ' + id);
      setFav(!fav);
    }
  };
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          className={classes.media}
          image={props.animatData.image_url}
          title={props.animatData.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.animatData.title}
          </Typography>
          <Typography
            className={classes.autoWrap}
            variant="body2"
            color="textSecondary"
            component="p"
          >
            {props.animatData.synopsis}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.autoCenter}>
        <IconButton aria-label="add" onClick={() => handleFav(props.animatData.mal_id)}>
          {fav ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
      </CardActions>
    </Card>
  );
}
