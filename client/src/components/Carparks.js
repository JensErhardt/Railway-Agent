import React, { Component } from 'react';
import api from '../api';

class Carparks extends Component {
  constructor(props) {
    super(props)
    this.state = {
      railwaystations: []
    }
  }
  componentDidMount() {
    api.getRailwaystations()
      .then(railwaystations => {
        console.log(railwaystations)
        this.setState({
          railwaystations: railwaystations
        })
      })
      .catch(err => console.log(err))
  }
  render() {                
    return (
      <div className="Railwaystations">
        <h2>List of Railwaystations</h2>
        {this.state.railwaystations.map((c, i) => <li key={i}>{c.name}</li>)}
      </div>
    );
  }
}

export default Railwaystations;
