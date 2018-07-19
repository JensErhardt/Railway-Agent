import React, { Component } from 'react';
import {
  Button, Form, FormGroup, Label, Input, FormFeedback, FormText, InputGroup,
  InputGroupAddon, Container
} from 'reactstrap';
import './SearchBar.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt, faListUl } from '@fortawesome/free-solid-svg-icons'

library.add(faMapMarkerAlt, faListUl)


class Searchbar extends Component {

  render() {

    console.log("PROPS",this.props.mapState)
    var handleToUpdate = this.props.handleToUpdate;

    let buttonIcon;

    if (this.props.mapState) {
      buttonIcon = <FontAwesomeIcon icon="list-ul" />
    } else {
      buttonIcon = buttonIcon = <FontAwesomeIcon icon="map-marker-alt" />
    }


    return (
      <div className="search-bar">
      <Container>
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
            color="primary">{buttonIcon} 
            </Button>
        </InputGroupAddon>

      </InputGroup>
    

      </Container>
      </div>
    )
  }
}

export default Searchbar;