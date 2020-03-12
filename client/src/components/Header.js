import React from 'react'
import {NavLink} from 'react-router-dom'
 import Button from '@material-ui/core/Button';


function Header (){
  return(
    <div className="Header">
      <div className='links'>
        <NavLink
        exact
        to={"/"}
        activeClassName="active">
          <Button>
          Upper Right Corner Button
          </Button>
        </NavLink>

        <NavLink
        to={"/loggedin"}
        activeClassName="active">
          <Button>
          Upper Right Corner Button 2
          </Button>
        </NavLink>
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