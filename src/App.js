import React, { Component } from 'react';
import {InputBox,Btn,Span} from './components/commoncomponents';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <InputBox inputClass="input-box" labelName="" placeholderText="E.g. Hangover" />
        {/* <Btn btnClass="btn" btnText="Search"/> */}
      </div>
    );
  }
}

export default App;
