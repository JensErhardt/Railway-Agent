import React, { Component } from 'react';
import api from '../api';
import { Link, Route } from 'react-router-dom';
import RailwaystationDetail from './RailwaystationDetail';
import SearchBar from './SearchBar';
import MapContainer from './MapContainer';




class Railwaystations extends Component {
  constructor(props) {
    super(props)
    this.state = {
      railwaystations: [],
      value: null,


    }
    this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {

    this.setState({ value: value });

    let value = event.target.value
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
        
        this.setState({
          railwaystations: stateField,
        })
      }
    }

  }

  componentDidMount() {
    api.getRailwaystations()
      .then(railwaystations => {
        console.log(railwaystations)
        this.setState({
          railwaystations: railwaystations,

        })
      })
      .catch(err => console.log(err))
  }
  render() {

    return (
      <div className="Railwaystations">
        <h2>List of Railwaystations</h2>
        <SearchBar onChange={this.handleChange} stations={this.state.railwaystations} />
        <ul>
          {this.state.railwaystations.map((e) =>
            <li key={e._id}><Link to={"/stations/" + e._id}>{e.name}</Link></li>)}
        </ul>
        <MapContainer stations={this.state.railwaystations} />
        {/* <RailwaystationDetail stations={this.state.railwaystations}/> */}
        <Route path="/stations/:id" component={RailwaystationDetail} />
      </div>
    );
  }
}

export default Railwaystations;
