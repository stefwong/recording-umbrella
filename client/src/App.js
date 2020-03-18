import React, { useState, useEffect } from 'react';
import './App.css';
import ItemsScreen from './screens/ItemsScreen'
import PrimarySearchAppBar from './components/PrimarySearchAppBar';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import UserStoreFrontEdit from './screens/UserStoreFrontEdit';
import GuestCheckout from './components/GuestCheckout';
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import SignupForm from './components/SignupForm'

import itemService from './services/items'
import userService from './services/users'
import loginService from './services/login'

function App() {

  const [shoppingCartItemsCount, setShoppingCartItemsCount] = useState(0)
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
	const [password, setPassword] = useState('')
	const [newPassword, setNewPassword] = useState('')
  const [user, setUser] = useState(null)

  const loginHook = () => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      itemService.setToken(user.token)
    }
  }

  useEffect(loginHook, [])

  const handleShoppingCartUpdated = () => {
    setShoppingCartItemsCount(shoppingCartItemsCount + 1)
  }
  const handleNameChange = ({ target: { value } }) => setName(value)
  const handleUsernameChange = ({ target: { value } }) => setUsername(value)
	const handlePasswordChange = ({ target: { value } }) => setPassword(value)
	const handleNewPasswordChange = ({ target: { value } }) => setNewPassword(value)

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login({ username, password })
    } catch (error) {
      throw error
    }
  }
  
  const handleSignUp = async (e) => {
    e.preventDefault()  

    const userObj = {
      username,
      password,
      name
    }

    try {
      await userService.create(userObj)
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      itemService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      throw error
    }
  }

  if (user) {
    console.log(Object.keys(user))
  }

  return (
    <>
      <Router>
        <PrimarySearchAppBar user={user} shoppingCartItemsCount={shoppingCartItemsCount}/>
        <Switch>
          <Route exact path='/signup' render={props => (
            <SignupForm {...props} user={user} username={username} password={password} name={name} handlePasswordChange={handlePasswordChange} handleUsernameChange={handleUsernameChange} handleNameChange={handleNameChange} handleSubmit={handleSignUp} />
          )} />
          <Route exact path='/signin' render={props => (
            <SignIn {...props}  handleLogin={handleLogin} />
          )} />
          <Route exact path="/GuestCheckout" render={props => (<GuestCheckout {...props} />)} />
          <Route exact path="/UserStoreFrontEdit" render={props => (<UserStoreFrontEdit {...props} />)} />
          <Route exact path="/home" render={props => (<ItemsScreen handleShoppingCartUpdated={handleShoppingCartUpdated} {...props} />)} />
          <Route exact path="/ItemsScreen/:searchText" render={props => (<ItemsScreen {...props} />)} />
          <Route path="/" render={props => (<ItemsScreen handleShoppingCartUpdated={handleShoppingCartUpdated} {...props} />)} />
        </Switch>
      </Router>

      {/* Survival App */}
      {/* <> */}
      {/* <ItemsScreen /> */}
      {/* <InventoryForm /> */}
      {/* <GuestCheckout /> */}
      {/* </> */}
    </>
  );
}

export default App;
