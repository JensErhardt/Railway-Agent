import React, { Component } from 'react';
import {
  Button, Form, FormGroup, Label, Input, FormFeedback, FormText, InputGroup,
  InputGroupAddon,
} from 'reactstrap';
import './SearchBar.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'

library.add(faMapMarkerAlt)


class Searchbar extends Component {

  render() {

    var handleToUpdate = this.props.handleToUpdate;
    return (
      <InputGroup>
        {/* <FontAwesomeIcon icon={"map-marker-alt"} /> */}
        {/* <FormGroup className="container"> */}
        <Label for="exampleSearch"></Label>
        <Input
          className="mb-3 mt-2"
          type="text"
          name="search"
          id="searchInput"
          placeholder="Search for station or city..."
          value={this.props.value}
          onChange={this.props.onChange}
          size="lg"
        />
        <InputGroupAddon
          addonType="append">
          <Button
            id="search-button"
            className="mb-3 mt-2"
            onClick={() => handleToUpdate()}
            color="primary">
            Toggle Map
            </Button>
        </InputGroupAddon>

        {/* </FormGroup> */}
      </InputGroup>


    )
  }
}

export default Searchbar;