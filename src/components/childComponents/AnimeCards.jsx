import React, { useState } from 'react';
import Axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 345,
    width: 345,
    margin: theme.spacing(10, 1),
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
  const [fav, setFav] = useState(true);
  const [confirm, setComfirm] = useState(false);
  const [message, setMessage] = useState('');
  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center'
  });
  const { vertical, horizontal, open } = state;

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const sendRequest = (type, id) => {
    if (type === 'add') {
      Axios.get(`api/add?id=${id}`)
        .then(function(response) {
          setComfirm(false);
          setState({ open: true, vertical: 'top', horizontal: 'center' });
          setMessage(response.data);
        })
        .catch(function(error) {
          setMessage(error);
        });
    } else if (type === 'delete') {
      Axios.delete(`api/delete?id=${id}`)
        .then(function(response) {
          setComfirm(false);
          setState({ open: true, vertical: 'top', horizontal: 'center' });
          setMessage(response.data);
        })
        .catch(function(error) {
          setMessage(error);
        });
    }
  };

  const handleFav = id => {
    setComfirm(true);
    if (fav === true) {
      // send ajax to back end
      console.log(`add to database ${id}`);
      setFav(!fav);
      sendRequest('add', id);
    } else {
      // send ajax to back end
      console.log(`delete from database ${id}`);
      setFav(!fav);
      sendRequest('delete', id);
    }
  };

  const handleJump = data => {
    props.history.push({
      pathname: `/detail/${props.animatData.mal_id}`
    });
  };

  return (
    <Card className={classes.root}>
      <div>
        <Snackbar
          autoHideDuration={6000}
          anchorOrigin={{ vertical, horizontal }}
          key={`${vertical},${horizontal}`}
          open={open}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="success">
            {/* window that tell user result */}
            {message}
          </Alert>
        </Snackbar>
      </div>
      <CardActionArea onClick={() => handleJump(props.animatData)}>
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
    </Card>
  );
}
