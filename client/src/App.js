import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import styled from 'styled-components';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:5000/api/posts')
      .then(response => {
        this.setState(prevState => Object.assign({}, prevState, { posts: response.data }));
      })

      .catch(err => {
        console.log('Error App.js');
      });
    //  fetch ('http://localhost:5000/api/posts')
    //  .then ( data => this.updateState({data}))
  }

  render() {
    return (
      <div className="App">
        <div className="app-container">{this.state.posts.map(post => <div><h3>{post.title} </h3>
        <p>{post.contents} </p></div>)}</div>
      </div>
    );
  }
}

export default App;
