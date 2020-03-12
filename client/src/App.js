import React from 'react';
import './App.css';
import ItemsGrid from './components/ItemsGrid'
import Header from './components/Header'
import ItemsScreen from './screens/ItemsScreen'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

function App() {
  return (
    <>
    <Header/>
    <div className="App">
      Survival App
      <ItemsScreen />
    </div>
    
    </>
  );
}

export default App;
