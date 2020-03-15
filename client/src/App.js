import React from 'react';
import './App.css';
import ItemsGrid from './components/ItemsGrid'
import ItemsScreen from './screens/ItemsScreen'
import InventoryForm from './components/InventoryForm'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import GuestCheckout from './components/GuestCheckout'

function App() {
  return (
    <div className="App">
      {/* Survival App */}
      <>
        {/* <ItemsScreen /> */}
        {/* <InventoryForm /> */}
        <GuestCheckout />
      </>
    </div>
  );
}

export default App;
