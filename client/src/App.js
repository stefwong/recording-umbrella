import React, {Component} from 'react';
import './App.css';
import ItemsGrid from './components/ItemsGrid'
import Header from './components/HeaderHome'
import ItemsScreen from './screens/ItemsScreen'
import LoggedIn from './screens/LoggedIn'
import SignUp from './screens/SignUp'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

class App extends Component {
  constructor() {
    super()
  }
  
  render (){

    return(
    <div>
    <Header />
    <Switch>
    <Route path="/loggedin" component={LoggedIn}/>
    <Route path="/signup" component={SignUp}/>
    </Switch>
    <div className="App">
      Survival App
      <ItemsScreen />
    </div>
    </div>
  
  );
}
}

export default App;
