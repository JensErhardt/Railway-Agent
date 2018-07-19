import React, { Component } from 'react';
import { Table } from 'reactstrap';
import api from '../api';
import {
  Button, Container, Row, Col, ListGroup, ListGroupItem, Card, CardImg, CardTitle, CardText, CardColumns,
  CardSubtitle, CardBody, Jumbotron
} from 'reactstrap';
import './RailwaystationDetail.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faParking, faWheelchair, faSync } from '@fortawesome/free-solid-svg-icons'

library.add(faParking, faWheelchair, faSync, faParking)

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

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id)
      this.componentDidMount()
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
        <Container>
          <CardColumns>
          <Card id="live-card" body inverse color="success">
              <CardTitle><strong>Live Data</strong> <FontAwesomeIcon icon="sync" /> </CardTitle>
              <CardSubtitle><u>Flinkster & CallABike</u></CardSubtitle> 
              <CardText>Bikes: {this.state.rentalObjects.bikesAvailable} <br/>
                Cars: {this.state.rentalObjects.carsAvailable}</CardText>   
              <CardSubtitle><u>Carpark</u></CardSubtitle>
              <CardText><i class="fas fa-parking"></i>Free Spaces: <br/> {this.state.prognosesData.prognosesText}</CardText>
            </Card>
            <Card>
              <CardBody id="station-card">
                <CardTitle><strong><u>{this.state.stationDetail.railwaystationDetail.name}</u></strong> </CardTitle>
                <CardSubtitle>{this.state.stationDetail.railwaystationDetail.address.street} <br />
                  {this.state.stationDetail.railwaystationDetail.address.zipcode} {this.state.stationDetail.railwaystationDetail.address.city} <br /></CardSubtitle>
                <CardText></CardText>
                <Button color="warning" onClick={(e) => this.handleFavoriteClick(e)}>Save Favorite</Button>
              </CardBody>
            </Card>
            <Card>
              <CardBody id="carpark-card">
              {/* <CardImg top width="1000" src="/images/carpark-symbol.png" alt="carpark-img" /> */}
                <CardTitle><FontAwesomeIcon icon="parking" />   <strong><a target="_blank" href={this.state.stationDetail.carparkDetail.carparkUrl}>{this.state.stationDetail.carparkDetail.name}</a></strong> </CardTitle>
                <CardSubtitle><strong>Entrance:</strong> <br/>{this.state.stationDetail.carparkDetail.address.street} {this.state.stationDetail.carparkDetail.address.postalCode} {this.state.stationDetail.railwaystationDetail.address.city} <br />
                </CardSubtitle>
                <CardText>
                <FontAwesomeIcon icon="wheelchair" /> Places: {this.state.stationDetail.carparkDetail.numberHandicapedPlaces} <br />
                  Total spaces: {this.state.stationDetail.carparkDetail.numberParkingPlaces}
                </CardText>
              </CardBody>
            </Card>
          </CardColumns>
        </Container>
      </div>
    );
  }
}

export default RailwaystationDetail;
