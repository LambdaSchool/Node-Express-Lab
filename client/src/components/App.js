import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import {  } from '../actions';


class App extends Component {
  
  render() {
    return (
      <div className="App">
       
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
    prop: state.prop
});

export default connect(mapStateToProps,
  {}
) (App);
