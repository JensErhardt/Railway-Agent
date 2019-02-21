import React, { Component } from 'react';

import api from '../api';

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: "",
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(stateFieldName, event) {
    let newState = {}
    newState[stateFieldName] = event.target.value

    this.setState(newState)
  }

  handleClick(e) {
    e.preventDefault()
    this.logIn()
  }

  logIn() {
    const user = this.state.email;
    const pw = this.state.password;

    api.login(user, pw)
      .then(() => {
        this.props.history.push("/")
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    const state = this.state;

    return (
      <div className="container">
        <h2>Login</h2>
        <div className="form-group">
          <input
            type="text"
            value={state.email}
            onChange={(e) => { this.handleChange("email", e) }}
            placeholder="email..."
          />
          <input
            type="password"
            value={state.password}
            onChange={(e) => { this.handleChange("password", e) }}
            placeholder="password..."
          />
          <button className="btn btn-primary" onClick={(e) => this.handleClick(e)}>Login</button>
        </div>
      </div>
    );
  }
}

export default Login;