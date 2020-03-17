import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { createItem } from '../services/items'
import { signUp, signInUser } from '../services/auth'
import shoppingCartService from '../util/ShoppingCartService'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly'
  },
  textField: {
    margin: theme.spacing(2),
    width: 300,
  },
}));

const GuestCheckout = (props) => {
  
  const classes = useStyles();

  const shoppingCart=shoppingCartService.getCart();


  console.log(shoppingCart);
  const itemsDiv =  shoppingCart && shoppingCart.map((item, index)=>{
      return (<div key={item.id}>
        <p>{item.product.description}  {item.quantity}</p>
        <img src={item.product.img} alt={`image of ${item.name}`}/>
      </div>)
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