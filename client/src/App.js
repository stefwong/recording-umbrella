import React, { useState } from 'react';
import './App.css';
import ItemsScreen from './screens/ItemsScreen'
import PrimarySearchAppBar from './components/PrimarySearchAppBar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
} from "react-router-dom";
import UserStoreFrontEdit from './screens/UserStoreFrontEdit';
import GuestCheckout from './components/GuestCheckout';

function App() {

  const [shoppingCartItemsCount, setShoppingCartItemsCount] = useState(0)
  const handleShoppingCartUpdated = () => {
    setShoppingCartItemsCount(shoppingCartItemsCount + 1)
  }

  return (
    <>
    <div className="App">
      <Router>
        <PrimarySearchAppBar shoppingCartItemsCount={shoppingCartItemsCount}/>
        <Switch>
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
    </div>
    </>
  );
}

export default App;
