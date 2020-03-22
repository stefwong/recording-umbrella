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
  const [itemsToShow, setItemsToShow] = useState([])
  const [searchText, setSearchText] = useState("");
  
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
        .then(res => {
          setItems(res)
          setItemsToShow(res)
        })
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
  const handleSearchChange = ({ target: { value } }) => setSearchText(value)
  
  const submitSearchQuery = () => {
    const searchResults = searchText.length ? items.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase())) : items
    setItemsToShow(searchResults)
    setSearchText('')
  }

  const keyPressed = ({ key }) => {
    if (key === 'Enter') {
      submitSearchQuery()
    }
  }

  const handleSearchClick = () => submitSearchQuery()

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
        {user ? <PrimarySearchAppBar searchText={searchText} handleChange={handleSearchChange} handleClick={handleSearchClick} handleKeyPress={keyPressed} shoppingCartItemsCount={shoppingCartItemsCount} handleLogOut={handleLogOut} /> : <GuestNavBar />}
        <Switch>
          <Route path='/signup' render={props => (
            <SignupForm {...props} username={username} password={password} name={name} handlePasswordChange={handlePasswordChange} handleUsernameChange={handleUsernameChange} handleNameChange={handleNameChange} handleSubmit={handleSignUp} />
          )} />
          <Route path='/signin' render={props => (
            <SigninForm {...props} username={username} newPassword={newPassword} password={password} handlePasswordChange={handlePasswordChange} handleNewPasswordChange={handleNewPasswordChange} handleUsernameChange={handleUsernameChange} handleSubmit={handleLogin} handleUpdateAccount={handleUpdateAccount} />
          )} />
          <Route path="/GuestCheckout" render={props => (<GuestCheckout {...props} />)} />
          <Route path="/UserStoreFrontEdit" render={props => (<UserStoreFrontEdit {...props} />)} />
          <Route path="/ItemCreate" render={props => (<ItemCreate {...props} />)} />
          <Route exact path="/" render={props => (user ? <ItemsScreen {...props} items={itemsToShow} /> : <LandingPage />)} />
          <Route path='/:id' render={props => (
            <ItemDetail handleDeleteItem={handleDeleteItem} user={user} {...props} />
          )} />
        </Switch>
      </Router>
    </>
  );
}


export default App;
