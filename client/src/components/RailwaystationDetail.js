import React, { Component } from 'react';
import api from '../api';

class RailwaystationDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stationDetail: []
    }
  }
  componentDidMount() {
    api.getRailwaystationDetails(this.props.match.params.id)
      .then(stationDetail => {       
        this.setState({
          stationDetail
        })
      })
      .catch(err => console.log(err))
  }
  com
  
  render() {
    if (!this.state.stationDetail[0]) {
      console.log("DEBUG stationDetail not loaded yet")
    } else {
    console.log("DEBUG stationDetail",this.state.stationDetail[0].name)
    let stationDetail = this.state.stationDetail;
    console.log(stationDetail[0].name);
    }
    return (
      <div className="railwaystationDetail">
        <h2>Details</h2>
        name: {} <br/>
      </div>
    );
  }
}

export default RailwaystationDetail;
