import React, { Component } from 'react';
import logo from './logo.svg';
import fetch from 'node-fetch';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {},
      result: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }

  handleSubmit(event) {
    event.preventDefault();

  /*Hier wird die Funktion "add" (obj.instance.exports.add(a,b)) aus der 
  WebAssembly Datei "add.wasm" aufgerufen*/
    WebAssembly.instantiateStreaming(fetch('add.wasm'))
      .then(obj => {
         const number = obj.instance.exports.add(this.state.form.number1, this.state.form.number2);
         this.setState({ result: number });
      });
  }

  handleChange(event) {
    const updatedForm = this.state.form;
    updatedForm[event.target.name] = event.target.value;
    this.setState({ form: updatedForm });
    event.preventDefault();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <form id="form" onSubmit={this.handleSubmit}>
          <label name="Number1" id="l_number1">Zahl 1: </label>
          <input type="number" name="number1" id="i_number1" value={this.state.form.number1 || ''} onChange={this.handleChange}></input>
          <label name="Number2" id="l_number2">Zahl 2: </label>
          <input type="number" name="number2" id="i_number2" value={this.state.form.number2 || ''} onChange={this.handleChange}></input>
          <button color="primary" type="submit">Addieren</button>
        </form>
        <p>Ergebnis: {this.state.result}</p>
      </div>
    );
  }
}

export default App;