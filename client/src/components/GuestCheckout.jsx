import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import shoppingCartService from '../util/ShoppingCartService'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';


const useStyles = makeStyles(theme => ({
  root: {

    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  textField: {
    // marginLeft: theme.spacing(1),
    // marginRight: theme.spacing(1),
    // marginTop: theme.spacing(2),
    // marginBottom: theme.spacing(2),
    margin: theme.spacing(2),
    width: 200,
  },
}));


const GuestCheckout = (props) => {
  
  const classes = useStyles();

  const shoppingCart=shoppingCartService.getCart();


  console.log(shoppingCart);
  const itemsDiv =  shoppingCart && shoppingCart.map((item, index)=>{
      return (
      <div key={item.id} className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <img className={classes.img} alt="complex" src={item.product.img} />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                {item.name}
                </Typography>
                <Typography variant="body2" gutterBottom>
                {item.product.description}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                Qty: {item.quantity}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2" style={{ cursor: 'pointer' }}>
                  Remove
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">${item.product.price}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
      )
    });


  
  return (
    <>
      <h2>Guest Checkout</h2>
      <p>Checkout while the items are still in stock!</p>
      {itemsDiv}
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          id="item-name"
          label="First Name"
          variant="outlined"
          size="small"
          style={{ margin: 8 }}
          margin="normal"
        />
        <TextField
          id="item-price"
          label="Last Name"
          variant="outlined"
          size="small" />
        <TextField
          label="Image Link"
          variant="outlined"
          id="img-link"
          helperText="Full width!"
          fullWidth
          size="small"
        />
        <TextField
          label="Image Link"
          variant="outlined"
          id="img-link"
          helperText="Full width!"
          fullWidth
          size="small"
        />
        <Button color="primary" variant="contained">Checkout</Button>
      </form>
    </>
  )
}

export default GuestCheckout