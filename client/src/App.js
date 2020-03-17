import React, { Component } from 'react';
import './App.css';
import ItemsGrid from './components/ItemsGrid'
import ItemsScreen from './screens/ItemsScreen'
import InventoryForm from './components/InventoryForm'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import GuestCheckout from './components/GuestCheckout'
import ItemCreate from './screens/ItemCreate'
import SignUp from './components/SignUp'
import ResetPassword from './components/ResetPassword'

class App extends Component {
  constructor() {
    super()
    this.state = {
      formData: {
        itemName: '',
        itemDescription: '',
        itemPrice: 0,
        imgLink: '',
        emailAddress: '',
        inputPassword: '',
        category: ''
      }
    }
  }
  handleSubmit = (event) => {
    event.preventDefault()
  }
  onChange = (event) => {
    if (event.target.name === 'itemPrice') {
      let value = event.target.value
      let name = event.target.name
      this.setState(prevState => ({
        formData: {
          ...prevState.formData,
          [name]: parseInt(value)
        }
      }))
    }
    else {
      let value = event.target.value
      let name = event.target.name
      this.setState(prevState => ({
        formData: {
          ...prevState.formData,
          [name]: value
        }
      }))
    }
  }
  render() {
    return (
      <div className="App">
        {/* Survival App */}
        <>
          <ItemCreate />
          {/* <ItemsScreen /> */}
          {/* <InventoryForm handleSubmit={this.handleSubmit} onChange={this.onChange} /> */}
          {/* <GuestCheckout /> */}
        </>
      </div>
    );
  }
}

export default App;
