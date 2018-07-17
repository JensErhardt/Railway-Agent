import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, FormFeedback, FormText } from 'reactstrap';

class Searchbar extends Component {

  render() {
    return (

       <FormGroup className="container">
          <Label for="exampleSearch"></Label>
          <Input
            type="text"
            name ="search"
            id="searchInput"
            placeholder="Berlin..."
            value={this.props.value}
            onChange={this.props.onChange} 
            bSize="lg"
            />
          <FormText>Please enter city or station to search for</FormText>
        </FormGroup>



    )
  }
}

export default Searchbar;