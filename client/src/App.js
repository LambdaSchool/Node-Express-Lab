import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from "axios";

class App extends Component {
  constructor(){
    super();
    this.state = {
      posts: []
    }
  }

  componentDidMount() {
    axios.get("http://localhost:5000/api/posts")
      .then(response => {
        this.setState({posts: response.data});
      })
      .catch(err => {
        console.log(err);
      })
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        
      </div>
    );
  }
}

export default App;
