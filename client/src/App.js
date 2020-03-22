import React, { useState, useEffect } from 'react';
import './App.css';
import ItemsScreen from './screens/ItemsScreen'
import ItemCreate from './screens/ItemCreate'
import ItemDetail from './screens/ItemDetail'
import PrimarySearchAppBar from './components/PrimarySearchAppBar';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import GuestNavBar from './screens/GuestNavBar'
import LandingPage from './screens/LandingPage.jsx'
import UserStoreFrontEdit from './screens/UserStoreFrontEdit';
import GuestCheckout from './components/GuestCheckout';

import SignupForm from './components/SignupForm'
import SigninForm from './components/SigninForm'

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
  const [items, setItems] = useState([])
  
  const loginHook = () => {
    try{
      const loggedUserJSON = window.localStorage.getItem('loggedInUser')
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        setUser(user)
        itemService.setToken(user.token)
      }
    }
    catch(err){
      setUser(null)
    }

  }

  const itemsHook = () => {
      itemService.getAll()
          .then(res => setItems(res))
  }
  
  useEffect(loginHook, [])
  useEffect(itemsHook, [])

  const handleShoppingCartUpdated = () => {
    setShoppingCartItemsCount(shoppingCartItemsCount + 1)
  }
  const handleNameChange = ({ target: { value } }) => setName(value)
  const handleUsernameChange = ({ target: { value } }) => setUsername(value)
  const handlePasswordChange = ({ target: { value } }) => setPassword(value)
  const handleNewPasswordChange = ({ target: { value } }) => setNewPassword(value)

  const handleDeleteItem = async (id) => {
    try {
      await itemService.remove(id)
    } catch (error) {
      throw error
    }
  }

  const handleLogin = async () => {
    try {
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

  const handleUpdateAccount = async () => {
    const userObj = {
      username,
      password,
      newPassword
    }

    try {
      await userService.update(userObj)
      setUsername('')
      setPassword('')
      setNewPassword('')
    } catch (error) {
      throw error
    }
  }

  const handleSignUp = async () => {
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

  const handleLogOut = async () => {
    try {
      await localStorage.clear()
      setUser(null)
    } catch (error) {
      throw error
    }
  }

  return (
    <>
      <Router>
        {user ? <PrimarySearchAppBar user={user} shoppingCartItemsCount={shoppingCartItemsCount} handleLogOut={handleLogOut} /> : <GuestNavBar />}
        <Switch>
          <Route exact path='/signup' render={props => (
            <SignupForm {...props} username={username} password={password} name={name} handlePasswordChange={handlePasswordChange} handleUsernameChange={handleUsernameChange} handleNameChange={handleNameChange} handleSubmit={handleSignUp} />
          )} />
          <Route exact path='/signin' render={props => (
            <SigninForm {...props} username={username} newPassword={newPassword} password={password} handlePasswordChange={handlePasswordChange} handleNewPasswordChange={handleNewPasswordChange} handleUsernameChange={handleUsernameChange} handleSubmit={handleLogin} handleUpdateAccount={handleUpdateAccount} />
          )} />
          <Route exact path="/GuestCheckout" render={props => (<GuestCheckout {...props} />)} />
          <Route exact path="/UserStoreFrontEdit" render={props => (<UserStoreFrontEdit {...props} />)} />
          {/* <Route exact path="/home" render={props => (<ItemsScreen handleShoppingCartUpdated={handleShoppingCartUpdated} {...props} />)} /> */}
          {/* <Route exact path="/ItemsScreen/:searchText" render={props => (<ItemsScreen {...props} />)} /> */}
          {/* <Route exact path="/" render={props => (<ItemsScreen {...props} />)} /> */}
          {/* <Route exact path="/" render={props => (<div {...props}> Testing </div>)} /> */}
          {/* <Route path='/:id' render={props => (
            <ItemDetail {...props} user = {user} /> */}

          <Route exact path="/ItemCreate" render={props => (<ItemCreate {...props} />)} />
          <Route exact path="/ItemsScreen/:searchText" render={props => (<ItemsScreen {...props} items={items} />)} />
          <Route exact path="/" render={props => (user ? <ItemsScreen {...props} items={items} /> : <LandingPage />)} />
          <Route path='/:id' render={props => (
            <ItemDetail handleDeleteItem={handleDeleteItem} user={user} {...props} />
          )} />
        </Switch>
      </Router>


    </>
  );
}


export default App;
