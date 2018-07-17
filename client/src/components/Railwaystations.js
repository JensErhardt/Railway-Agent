import React, { Component } from 'react';
import api from '../api';
import { Link, Route } from 'react-router-dom';
import RailwaystationDetail from './RailwaystationDetail';
import SearchBar from './SearchBar';
import MapContainer from './MapContainer';
import { Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap';




class Railwaystations extends Component {
  constructor(props) {
    super(props)
    this.state = {
      railwaystations: [],
      value: "",
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {


    let value = event.target.value
    this.setState({ value: value });
    let comparator = value.toUpperCase();

    console.log(value);
    console.log(comparator);

    let cities = [];
    for (let i = 0; i < this.state.railwaystations.length; i++) {
      cities.push(this.state.railwaystations[i].address.city);
    }

    let resultField = cities.map(function (elt) { return elt.toUpperCase() })
    console.log("resultField", resultField);
    let stateField = [];
    for (let i = 0; i < this.state.railwaystations.length; i++) {
      if (comparator === resultField[i]) {
        console.log("MATCH", resultField[i])
        stateField.push(this.state.railwaystations[i])
        console.log(stateField);
      }
    }

  }

  componentDidMount() {
    api.getRailwaystations()
      .then(railwaystations => {
        railwaystations.sort(
          function(a,b) {return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);} 
        ); 
        console.log(railwaystations)
        this.setState({
          railwaystations: railwaystations,
        })
      })
      .catch(err => console.log(err))
  }
  render() {
    let filteredStations = this.state.railwaystations
      .filter(railwaystation => railwaystation.name.toUpperCase().includes(this.state.value.toUpperCase()))

    return (
      <div className="Railwaystations">
      <Container>
        <SearchBar onChange={this.handleChange} stations={this.state.railwaystations} />
        <Row>
        <Col>
        <ListGroup>
          {filteredStations
            .map((e) =>
              <ListGroupItem key={e._id}><Link to={"/stations/" + e._id}>{e.name}</Link></ListGroupItem>)}
        </ListGroup>
        </Col>
        <Col>
        <MapContainer stations={filteredStations} />
         </Col>
         </Row>
          </Container>
      </div>
    );
  }
}

export default Railwaystations;
