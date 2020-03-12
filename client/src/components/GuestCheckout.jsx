import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly'
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
  return (
    <>
      <h2>Guest Checkout</h2>
      <p>Checkout while the items are still in stock!</p>
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
        <Button color="primary" variant="contained">ADD TO INVENTORY</Button>
      </form>
    </>
  )
}

export default GuestCheckout