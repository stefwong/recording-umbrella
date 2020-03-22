import React from 'react';
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

import { MemoryRouter as Router } from 'react-router'
import { Link } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 8)
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  }
}))

export default function LandingPage() {
  const classes = useStyles();
  return (
    <>
      <CssBaseline />
      <main>
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography variant="h1" component="h1" align="center" color="textPrimary" gutterBottom>
              This is BIG H1 text
        </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              This is smaller text
        </Typography>
        <div className={classes.heroButtons}>
            <Grid container spacing={2} justify="center">
              <Grid item>
                <Router>
                  <Button variant="contained" color="primary" component={Link}
                    to="/about">
                    About
                  </Button>
                </Router>
              </Grid>
            </Grid>

            <Grid item>
              <Button variant="contained" color="primary">
                Second Button
              </Button>
            </Grid>
            </div>
          </Container>  
        </div>
      </main>
    </>
  )
}