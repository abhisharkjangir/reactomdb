import React, { Component } from 'react';
import {Container,Header} from './components/commoncomponents';
import './App.css';

class App extends Component {
  render() {
    const menuItems = [{name:'OMDB',link:'',id:1}];
    return (
      <div className="App">
        <Header  menuItems={menuItems}/>
        <Container />
      </div>
    );
  }
}

export default App;
