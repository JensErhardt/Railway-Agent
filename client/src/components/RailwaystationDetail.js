import React, { Component } from 'react';
import api from '../api';

class RailwaystationDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stationDetail: null,
      rentalObjects: null

    }
  }
  componentDidMount() {
    api.getRailwaystationDetails(this.props.match.params.id)
      .then(stationDetail => {
        api.getRentalObjects(this.props.match.params.id)
          .then(rentalObjects => {
            api.getCarparkPrognoses(this.props.match.params.id)
              .then(prognosesData => {
                this.setState({
                  stationDetail,
                  rentalObjects,
                  prognosesData
                })
              })
          })
      })
      .catch(err => console.log(err))

      .catch(err => console.log(err));
  }

  render() {
    console.log("DEBUG state", this.state);
    return (
      this.state.stationDetail && <div className="railwaystationDetail">
        <h1>{this.state.stationDetail.railwaystationDetail.name}</h1>

        Street: {this.state.stationDetail.railwaystationDetail.address.street} <br />
        Zipcode: {this.state.stationDetail.railwaystationDetail.address.zipcode} <br />
        City: {this.state.stationDetail.railwaystationDetail.address.city} <br />

        <h2>Carpark: {this.state.stationDetail.carparkDetail.name}</h2>
        Entrance: {this.state.stationDetail.carparkDetail.address.street} <br />
        Zipcode: {this.state.stationDetail.carparkDetail.address.postalCode} <br />
        Total Spaces: {this.state.stationDetail.carparkDetail.numberParkingPlaces}<br />
        Handicaped Spaces: {this.state.stationDetail.carparkDetail.numberHandicapedPlaces}<br />
        Free Spaces: {this.state.prognosesData.prognosesText} <br />
        Last Update: {this.state.prognosesData.timestamp} <br/>

        <h2> Car- and Bikesharing </h2>
        Free Bikes: {this.state.rentalObjects.bikesAvailable}<br />
        Free Cars: {this.state.rentalObjects.carsAvailable}<br />
      </div>
    );
  }
}

export default RailwaystationDetail;
