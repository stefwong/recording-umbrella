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
  handleCategoryChange,
  cancelPath,
  history
}) => {
  const classes = useStyles();

  return (
    <div className='form-container'>
      <FormControl
        className={classes.root}
        noValidate autoComplete="off">
        <TextField
          required
          label="Item Name"
          variant="outlined"
          size="small"
          onChange={handleChange}
          name="name"
        />
        <TextField
          required
          label="Description"
          variant="outlined"
          size="small"
          onChange={handleChange}
          name="description"
        />
        <TextField
          required
          label="Price"
          variant="outlined"
          size="small"
          onChange={handleChange}
          name="price"
        />
        <FormControl>
          <InputLabel id="category-select-label">Category</InputLabel>
          <Select
            required
            labelId="category-select-label"
            id="category-select"
            value={item.category}
            name="category"
            onChange={handleCategoryChange}
          >
            <MenuItem value="food">Food</MenuItem>
            <MenuItem value="apparel">Apparel</MenuItem>
            <MenuItem value="sanitary">Sanitary</MenuItem>
            <MenuItem value="first aid">First Aid</MenuItem>
            <MenuItem value="misc">Misc</MenuItem>
          </Select>
        </FormControl>
        <TextField
          required
          id="imgLink"
          label="Image Link"
          variant="outlined"
          size="small"
          onChange={handleChange}
          name="imgUrl"
        />
        <Button color="primary" onClick={handleSubmit} variant="contained">ADD TO INVENTORY</Button>
      </FormControl>
    </div>
  )
}

export default ItemForm