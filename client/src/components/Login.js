import React, { Component } from 'react';
import api from '../api';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
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
    api.login(this.state.email, this.state.password)
      .then(result => {
        console.log('SUCCESS!')
        this.props.history.push("/") // Redirect to the home page
      })
      .catch(err => {
        console.log('ERROR')
      })
  }

  render() {
    return (
      <div className="Login">
        <h2>Login</h2>
        <FormGroup className="container">
          <Input
            type="text"
            value={this.state.email}
            onChange={(e) => { this.handleInputChange("email", e) }}
            placeholder="email..."
            bSize="lg"
          />
          <FormText>Please enter email</FormText>
          <Input
            type="password"
            value={this.state.password}
            onChange={(e) => { this.handleInputChange("password", e) }}
            placeholder="password..."
            bSize="lg"
          />
          <FormText>Please enter password</FormText>
          <Button color="primary" onClick={(e) => this.handleClick(e)}>Login</Button>
        </FormGroup>
      </div>
    );
  }
}

export default Login;
