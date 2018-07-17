import React, { Component } from 'react';
import api from '../api';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';


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
    let data = {
      email: this.state.email,
      name: this.state.name,
      password: this.state.password,
    }
    api.signup(data)
      .then(result => {
        console.log('SUCCESS!')
        this.props.history.push("/login") // Redirect to the login page
      })
      .catch(err => {
        console.log('ERROR')
      })
  }

  render() {
    return (
      <div className="Signup">

        <h2>Signup</h2>
        <FormGroup className="container">

          <Input
            type="text"
            value={this.state.email}
            placeholder="johndoe@gmail.com"
            onChange={(e) => { this.handleInputChange("email", e) }}
            bSize="lg"
          />
          <FormText>Please enter email</FormText>

          <Input
            type="text"
            placeholder="johndoe"
            value={this.state.name}
            onChange={(e) => { this.handleInputChange("name", e) }}
            bSize="lg"
          />
          <FormText>Please enter username</FormText>

          <Input
            type="password"
            placeholder="passwordigel123"
            value={this.state.password}
            onChange={(e) => { this.handleInputChange("password", e) }}
            bSize="lg"
          />
          <FormText>Please enter password</FormText>

          <Button color="primary" onClick={(e) => this.handleClick(e)}>Signup</Button>
        </FormGroup>

      </div>
    );
  }
}

export default Signup;
