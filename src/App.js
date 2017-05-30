import React, { Component } from 'react';
import {Container,Header} from './components/commoncomponents';
import './App.css';

class App extends Component {
  render() {
    const menuItems = [{name:'Home',link:'',id:1},{name:'Detail',link:'',id:2},{name:'Listing',link:'',id:3}];
    return (
      <div className="App">
        <Header  menuItems={menuItems}/>
        <Container />
        {/* <InputBox inputClass="input-box" labelName="" placeholderText="E.g. Hangover" /> */}
      </div>
    );
  }
}

export default App;
