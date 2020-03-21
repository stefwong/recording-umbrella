// import React from 'react'
// import { makeStyles } from '@material-ui/core/styles';
// import TextField from '@material-ui/core/TextField';
// import Button from '@material-ui/core/Button';
// import Select from '@material-ui/core/Select';

// const useStyles = makeStyles(theme => ({
//   root: {
//     '& > *': {
//       margin: theme.spacing(2),
//       width: 400,
//     },
//   },
// }));



// const InventoryForm = (props) => {
//   const classes = useStyles();
//   return (
//     <>
//       <h2>Add Items</h2>
//       <p>Add to your inventory</p>
//       <form
//         onSubmit={props.handleSubmit}
//         className={classes.root}
//         noValidate autoComplete="off">
//         <TextField
//           id="itemName"
//           label="Item Name"
//           variant="outlined"
//           size="small"
//           onChange={props.onChange}
//           name="itemName"
//         />
//         <TextField
//           id="itemDescription"
//           label="Description"
//           variant="outlined"
//           size="small"
//           onChange={props.onChange}
//           name="itemDescription"
//         />
//         <TextField
//           id="itemPrice"
//           label="Price"
//           variant="outlined"
//           size="small"
//           onChange={props.onChange}
//           name="itemPrice"
//         />
//         <Select
//           labelId="demo-simple-select-label"
//           id="demo-simple-select"
//           name="category"
//           value={Category}
//           onChange={props.onChange}
//         >
//           <MenuItem value={10}>Ten</MenuItem>
//           <MenuItem value={20}>Twenty</MenuItem>
//           <MenuItem value={30}>Thirty</MenuItem>
//         </Select>
//         <TextField
//           id="imgLink"
//           label="Image Link"
//           variant="outlined"
//           size="small"
//           onChange={props.onChange}
//           name="imgLink"
//         />
//         <Button color="primary" variant="contained">ADD TO INVENTORY</Button>
//       </form>
//     </>
//   )
// }

// export default InventoryForm