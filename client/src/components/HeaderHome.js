import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';


function Header() {
  return (
    <div className="Header">
      <div className='links'>
        <nav>
          <NavLink
            exact
            to={"/signup"}
            activeClassName="active">
            <Button>
              Sign Up
          </Button>
          </NavLink>

          <NavLink
            to={"/loggedin"}
            activeClassName="active">
            <Button>
              Log In
          </Button>
          </NavLink>
          </nav>
        </div>
        <h1>Let's get prepared!</h1>
        <h3>Welcome to the Survival App!</h3>

      <div className="middle-buttons">

        <Link
          exact
          to={"/blahblah"}
          activeClassName="active">
          <Button>Middle Button 1</Button>
        </Link>

        <Link
          exact
          to="/blahblahblahba"
          activeClassName="active">
          <Button>Middle Button 2</Button>
        </Link>
      </div>
    </div>
  )
}

export default Header; 