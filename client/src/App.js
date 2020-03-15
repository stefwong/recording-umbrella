import React, {useState} from 'react';
import './App.css';
import ItemsGrid from './components/ItemsGrid'
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
import MarketPlaceSearchResults from './screens/MarketPlaceSearchResults';

function App() {

     
  return (
    <div className="App">
      <Router>
        <PrimarySearchAppBar />
       
        <Switch>
          <Route exact path="/UserStoreFrontEdit" render={props => (<UserStoreFrontEdit {...props}/>)} />
          <Route exact path="/home" render={ props => (<ItemsScreen {...props} />)} />
          <Route exact path="/MarketPlaceSearchResults/:searchText" render={ props => (<MarketPlaceSearchResults {...props}/>)} />
          <Route exact path="/" render={ props => (<ItemsScreen {...props} />)} />
          
        </Switch>
      </Router>

    </div>
  );
}

export default App;
