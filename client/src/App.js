import React from 'react';
import './App.css';
import ItemsGrid from './components/ItemsGrid'
import Header from './components/Header'
import ItemsScreen from './screens/ItemsScreen'

function App() {
  return (
    <>
    <div className="App">
      Survival App
      <ItemsScreen />
    </div>
    <Header/>
    </>
  );
}

export default App;
