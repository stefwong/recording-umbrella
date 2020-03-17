import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { createItem } from '../services/items'
import { signUp, signInUser } from '../services/auth'

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

class GuestCheckout extends Component {
  constructor() {
    super()

    this.state = {
      email: '',
      password: '',
      itemName: '',
      itemPrice: '',
      isError: false,
      errorMsg: ''
    }
  }
  onSignUp = event => {
    event.preventDefault()

    const { history, setUser } = this.props

    signUp(this.state)
      .then(() => signInUser(this.state))
      .then(res => setUser(res.user))
      .then(() => history.push('/'))
      .catch(error => {
        console.error(error)
        this.setState({
          email: '',
          password: '',
          passwordConfirmation: '',
          isError: true,
          errorMsg: 'Sign Up Details Invalid'
        })
      })
  }

  renderError = () => {
    const toggleForm = this.state.isError ? 'danger' : ''
    if (this.state.isError) {
      return (
        <button type="submit" className={toggleForm}>
          {this.state.errorMsg}
        </button>
      )
    } else {
      return <button type="submit">Sign In</button>
    }
  }


  handleChange = (event) => {
    if (event.target.name === 'itemPrice') {
      const updatedField = { [event.target.name]: parseInt(event.target.value) }
      const editedItem = Object.assign(this.state.item, updatedField)
      this.setState({ item: editedItem })
    }
    else {
      const updatedField = { [event.target.name]: event.target.value }
      const editedItem = Object.assign(this.state.item, updatedField)
      this.setState({ item: editedItem })
    }
  }
  handleSubmit = async (event) => {
    event.preventDefault()

    const response = await createItem(this.state.item)
    if (response.status === 201) {
      this.props.addItem(response.data)
      this.setState({
        createdItem: response.data
      })
    }
  }
  render() {
    const classes = useStyles();
    const { handleChange, handleSubmit } = this
    const { createdItem, item } = this.state
    const { history } = this.props
    return (
      <>
        <h2>Guest Checkout</h2>
        <p>Checkout while the items are still in stock!</p>
        <form onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="off">
          <TextField
            name="itemName"
            label="First Name"
            variant="outlined"
            size="small"
            style={{ margin: 8 }, { width: 250 }}
            margin="normal"
            onChange={handleChange}
          />
          <TextField
            name="itemPrice"
            label="Last Name"
            variant="outlined"
            size="small"
            style={{ margin: 8 }, { width: 250 }}
            margin="normal"
            onChange={handleChange}
          />
          <TextField
            name="emailAddress"
            label="Your Email Address"
            variant="outlined"
            fullWidth
            size="small"
            style={{ margin: 8 }}
            margin="normal"
            onChange={handleChange}
          />
          <TextField
            name="inputPassword"
            label="Image Link"
            variant="outlined"
            fullWidth
            size="small"
            style={{ margin: 8 }}
            margin="normal"
            onChange={handleChange}
          />
          <Button color="primary" variant="contained" fullWidth style={{ margin: 8 }}
            margin="normal">SIGN UP</Button>
        </form>
      </>
    )
  }
}


export default GuestCheckout