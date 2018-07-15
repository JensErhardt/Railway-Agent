import React, { Component } from 'react';
import api from '../api';
import { Link, Route } from 'react-router-dom';

class RailwaystationDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      railwaystationDetail: []
    }
  }
  componentDidMount() {
    console.log("DEBUG railwaystationDetail")
    api.getRailwaystationDetails(this.props.match.params.id)
      .then(railwaystationDetail => {
        console.log("DEBUG railwaystationDetail")
        this.setState({
          railwaystationDetail: railwaystationDetail
        })
      })
      .catch(err => console.log(err))
  }
  render() {
    return (
      <div className="railwaystationDetail">
        
        <h2>Details</h2>
        name: {this.state.railwaystationDetail.name} <br/>
         <br/>
      </div>
    );
  }
}

export default RailwaystationDetail;
