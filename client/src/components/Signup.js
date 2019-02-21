import React, { Component } from 'react';
import api from '../api';

class Signup extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      email: "",
      name: "",
      password: "",
    }
  }

  handleInputChange(stateFieldName, event) {
    let newState = {}
    newState[stateFieldName] = event.target.value

    this.setState(newState)
  }

  handleClick(e) {
    e.preventDefault()
    
    const data = {
      email: this.state.email,
      name: this.state.name,
      password: this.state.password,
    }
    api.signup(data)
      .then(() => {
        this.props.history.push("/login") 
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    return (
      <div className="container">

        <h2>Signup</h2>
        <div className="form-group">
          <input
            type="text"
            value={this.state.email}
            placeholder="johndoe@gmail.com"
            onChange={(e) => { this.handleInputChange("email", e) }}
          />
          <input
            type="password"
            placeholder="passwordigel123"
            value={this.state.password}
            onChange={(e) => { this.handleInputChange("password", e) }}
          />
          <button className="btn btn-primary" onClick={(e) => this.handleClick(e)}>Signup</button>
        </div>

      </div>
    );
  }
}

export default Signup;
