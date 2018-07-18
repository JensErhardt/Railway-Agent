import React, { Component } from 'react';
import { Table } from 'reactstrap';
import api from '../api';

class RailwaystationDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stationDetail: null,
      rentalObjects: null,
      userFavorites: [],
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
  }

  handleFavoriteClick(e) {
  console.log(this.props.match.params.id);
  let id = this.props.match.params.id
    api.postFavorite(id)
    console.log("DEBUG handleFavoriteClick");
    
  }

  render() {
    
    return (
      this.state.stationDetail && <div className="railwaystationDetail">
        <h2>Location Details</h2>

        <button
        onClick={(e) => this.handleFavoriteClick(e)}>Save Favorite</button>

        <div>
          <address>
            <strong>{this.state.stationDetail.railwaystationDetail.name}</strong> <br />
            {this.state.stationDetail.railwaystationDetail.address.street} <br />
            {this.state.stationDetail.railwaystationDetail.address.zipcode} {this.state.stationDetail.railwaystationDetail.address.city} <br />
          </address>

          <Table striped>
            <thead>
              <tr>
                <th>Flinkster & Call A Bike</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Available Bikes</td>
                <td>{this.state.rentalObjects.bikesAvailable}</td>
              </tr>
              <tr>
                <td>Available Cars</td>
                <td>{this.state.rentalObjects.carsAvailable}</td>
              </tr>
            </tbody>

            <thead>
              <tr>
                <th>Parking Information</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Carpark</td>
                <td><a target="_blank" href={this.state.stationDetail.carparkDetail.carparkUrl}>{this.state.stationDetail.carparkDetail.name}</a></td>
              </tr>
              <tr>
                <td>Prognoses for available spaces in 1h</td>
                <td>{this.state.prognosesData.prognosesText}</td>
              </tr>
              <tr>
                <td>Entrance</td>
                <td>{this.state.stationDetail.carparkDetail.address.street}, {this.state.stationDetail.carparkDetail.address.postalCode} {this.state.stationDetail.railwaystationDetail.address.city}</td>
              </tr>
              <tr>
                <td>Number of handicaped places</td>
                <td>{this.state.stationDetail.carparkDetail.numberHandicapedPlaces}</td>
              </tr>
              <tr>
                <td>Number of total spaces</td>
                <td>{this.state.stationDetail.carparkDetail.numberParkingPlaces}</td>
              </tr>

            </tbody>
          </Table>

        </div>
      </div>
    );
  }
}

export default RailwaystationDetail;
