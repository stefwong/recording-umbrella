import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(2),
      width: 400,
    },
  },
}));



const InventoryForm = (props) => {
  const classes = useStyles();
  return (
    <>
      <h2>Add Items</h2>
      <p>Add to your inventory</p>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          id="item-name"
          label="Item Name"
          variant="outlined"
          size="small"
        />
        <TextField
          id="item-price"
          label="Price"
          variant="outlined"
          size="small" />
        <TextField
          id="img-link"
          label="Image Link"
          variant="outlined"
          size="small"
        />
        <Button color="primary" variant="contained">ADD TO INVENTORY</Button>
      </form>
    </>
  )
}

export default InventoryForm