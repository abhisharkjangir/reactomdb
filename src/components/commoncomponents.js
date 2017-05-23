import React, {Component} from 'react';

class InputBox extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
   this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert(this.state.value);
  }

  render() {
    return (
      <span>
        <input className={this.props.inputClass} name={this.props.labelName} value={this.state.value} type="text" placeholder={this.props.placeholderText} onChange={this.handleChange} />
        <button className="btn" onClick={this.handleSubmit} >Get</button><br/>
        <span>My Value is : {this.state.value}</span>
      </span>
    );
  }
}

class Btn extends Component {
  render() {
    return (
      <button  className={this.props.btnClass} type="button" >{this.props.btnText}</button>
    );
  }
}

class Span extends Component {
  render(){
    return (
      <span>{this.props.spanText}</span>
    );
  }
}

export {InputBox, Btn, Span}
