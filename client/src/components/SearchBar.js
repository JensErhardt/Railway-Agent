import React, { Component } from 'react';
import {
  Button, Form, FormGroup, Label, Input, FormFeedback, FormText, InputGroup,
  InputGroupAddon,
} from 'reactstrap';

class Searchbar extends Component {

  render() {

    var handleToUpdate = this.props.handleToUpdate;
    return (
      <InputGroup>
        {/* <FormGroup className="container"> */}
        <Label for="exampleSearch"></Label>
        <Input
          type="text"
          name="search"
          id="searchInput"
          placeholder="Search for station or city..."
          value={this.props.value}
          onChange={this.props.onChange}
          bSize="lg"
        />
        <InputGroupAddon
          addonType="append">
          <Button
            onClick={() => handleToUpdate()}
            color="secondary">
            Toggle Map
            </Button>
        </InputGroupAddon>

        {/* </FormGroup> */}
      </InputGroup>


    )
  }
}

export default Searchbar;