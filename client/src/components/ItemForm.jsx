import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(2),
      width: 400,
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));


const ItemForm = ({
  item,
  handleSubmit,
  handleChange,
  cancelPath,
  history
}) => {
  const classes = useStyles();

  return (
    <div className='form-container'>
      <FormControl
        onSubmit={handleSubmit}
        className={classes.root}
        noValidate autoComplete="off">
        <TextField
          required
          label="Item Name"
          variant="outlined"
          size="small"
          onChange={handleChange}
          name="itemName"
        />
        <TextField
          required
          label="Description"
          variant="outlined"
          size="small"
          onChange={handleChange}
          name="itemDescription"
        />
        <TextField
          required
          label="Price"
          variant="outlined"
          size="small"
          onChange={handleChange}
          name="itemPrice"
        />
        <InputLabel id="category-select-label">Category</InputLabel>
        <Select
          required
          labelId="category-select-label"
          value="Select Category"
          name="category"
          onChange={handleChange}
        >
          <MenuItem value="food">Food</MenuItem>
          <MenuItem value="apparel">Apparel</MenuItem>
          <MenuItem value="sanitary">Sanitary</MenuItem>
          <MenuItem value="first aid">First Aid</MenuItem>
          <MenuItem value="misc">Misc</MenuItem>
        </Select>
        <TextField
          required
          id="imgLink"
          label="Image Link"
          variant="outlined"
          size="small"
          onChange={handleChange}
          name="imgLink"
        />
        <Button color="primary" variant="contained">ADD TO INVENTORY</Button>
      </FormControl>
    </div>
  )
}

export default ItemForm