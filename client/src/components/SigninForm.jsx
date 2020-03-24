import React, { useState } from 'react'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';



const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SigninForm = ({ username, password, newPassword, handleUsernameChange, handleNewPasswordChange, handlePasswordChange, handleSubmit, handleUpdateAccount, history }) => {
  const classes = useStyles();
  const [forgot, setForgot] = useState(false)

  const submitHandler = (e) => {
    e.preventDefault()
    if (!forgot) {
      handleSubmit()
        .then(() => history.push('/'))
        .catch(error => console.error(error))
    } else {
      handleUpdateAccount()
        .then(() => {
          setForgot(false)
        })
        .catch(error => console.error(error))
    }
  }

  const renderSignInForm = () => {

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>



              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="username"
                  label="Email"
                  name="username"
                  autoComplete="username"
                  value={username}
                  onChange={handleUsernameChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </Grid>
              {forgot && <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="newPassword"
                  label="New Password"
                  type="password"
                  id="new-password"
                  autoComplete="new-password"
                  value={newPassword}
                  onChange={handleNewPasswordChange}
                />
              </Grid>}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color={forgot ? "default" : "primary"}
              className={classes.submit}
              onClick={submitHandler}
            >
              {forgot ? "Change password" : "Sign In"}
            </Button>
            <Grid item xs={12} onClick={() => setForgot(!forgot)}>
              <Link>
              {forgot ? "Cancel" : "Forgot password"}
              </Link>
              </Grid>

          </form>
        </div>
        <Box mt={5}>

        </Box>
      </Container>
    );
  }

  return renderSignInForm()

}

export default SigninForm
