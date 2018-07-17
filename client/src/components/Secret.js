import React, { Component } from 'react';
// import { Route, Switch, NavLink, Link } from 'react-router-dom';
import api from '../api';
import { log } from 'util';
// import './Secret.css';

class Secret extends Component {
  constructor(props) {
    super(props)
    this.state = {
      secret: null,
      favorites: []
    }
  }
  componentDidMount(props) {
    api.getSecret()
      .then(data => {
        api.getFavorites()
          .then(userData => {
            this.setState({
              secret: data.answerToLifeTheUniverseAndEverything,
              favorites: userData
            })
          })
      })
  }
  render() {
    console.log(this.state);
    

    return (
      <div className="Secret">
        <h2>Secret</h2>
        {this.state.secret}
      </div>
    );
  }
}

export default Secret;
