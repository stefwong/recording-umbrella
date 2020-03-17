import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { signUp, signInUser } from '../services/auth'

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(2),
      width: 400,
    },
  },
}));

class SignUp extends Component {
  constructor() {
    super()

    this.state = {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      isError: false,
      errorMsg: ''
    }
  }


  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
      isError: false,
      errorMsg: ''
    })
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

  render() {
    // const classes = useStyles();
    const { email, username, password, passwordConfirmation } = this.state
    return (
      <>
        <h2>Sign In</h2>
        <form onSubmit={this.onSignIn} noValidate autoComplete="off">
          <label>Username</label>
          <TextField
            label="Email Address"
            variant="outlined"
            size="small"
            onChange={this.handleChange}
            name="emailAddress"
          />
          <label>Email Address</label>
          <TextField
            label="Email Address"
            variant="outlined"
            size="small"
            onChange={this.handleChange}
            name="emailAddress"
          />
          <label>Password</label>
          <TextField
            id="itemDescription"
            label="Password"
            variant="outlined"
            size="small"
            onChange={this.handleChange}
            name="password"
          />
          <Button color="primary" variant="contained">SIGN IN</Button>
        </form>
      </>
    )
  }
}

export default SignUp