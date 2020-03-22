import React from 'react';
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

import { Link } from 'react-router-dom'

const GuestNavBar = () => {
  return (
    <>
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            The Survival Kit App
            <>
              <Link to='/signup'>
                <Button variant="contained" color="primary">
                  Sign Up
                </Button>
              </Link>
              <Link to='/signin'>
                <Button variant="contained" color="primary">
                  Sign In
                </Button>
              </Link>
            </>            
          </Typography>
        </Toolbar>
      </AppBar>      
    </>
  )
}

export default GuestNavBar
