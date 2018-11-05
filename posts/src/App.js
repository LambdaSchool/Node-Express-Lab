import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import Posts from './Posts'

class App extends Component {
  constructor() {
    super();
    this.state = {
      posts: []
    }
  }
  componentDidMount() {
    axios
    .get('http://localhost:8000/api/posts')
    .then(response => {
      this.setState({
        posts: response.data
      })
    })
    .catch(error => {
      console.log(error);
    })
  }

  render() {
    return (
      <div className="App">
      <Posts posts={this.state.posts} />
      </div>
    );
  }
}

export default App;
