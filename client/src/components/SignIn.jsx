import React, {Component} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { signInUser } from '../services/auth'

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(2),
      width: 400,
    },
  },
}));

class SignIn extends Component {
  constructor() {
    super()

    this.state = {
      email: '',
      password: '',
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

onSignIn = event => {
    event.preventDefault()

    const { history, setUser } = this.props

    signInUser(this.state)
        .then(res => setUser(res.user))
        .then(() => history.push('/'))
        .catch(error => {
            console.error(error)
            this.setState({
                isError: true,
                errorMsg: 'Invalid Credentials',
                emailAddress: '',
                password: ''
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
    const classes = useStyles();
    const { username, password } = this.state
    return (
      <>
        <h2>Sign In</h2>
        <form onSubmit={this.onSignIn} className={classes.root} noValidate autoComplete="off">
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

export default SignIn