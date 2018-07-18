import React, { Component } from 'react';
import { Route, Switch, NavLink, Link } from 'react-router-dom';
import api from '../api';
import Favorites from './Favorites';


class Secret extends Component {
  constructor(props) {
    super(props)
    this.state = {
      secret: null,
    }
  }
  componentDidMount(props) {
    api.getSecret()
      .then(data => {
        this.setState({
          secret: data.answerToLifeTheUniverseAndEverything,

        })
      })
  }
  render() {
    console.log(this.state);
    return (
      <div className="Secret">
        <h2>Secret</h2>
        <Favorites />
      </div>
    );
  }
}

export default Secret;
