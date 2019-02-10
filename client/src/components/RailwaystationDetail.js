import React, { Component } from 'react';
import api from '../api';
import {
  Button, Container, Card, CardTitle, CardText, CardColumns,
  CardSubtitle, CardBody, Popover, PopoverHeader, PopoverBody
} from 'reactstrap';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faParking, faWheelchair, faSync, faStar } from '@fortawesome/free-solid-svg-icons'
import './RailwaystationDetail.css';

library.add(faParking, faWheelchair, faSync, faParking, faStar)

class RailwaystationDetail extends Component {
  constructor(props) {
    super(props)
    this.toggle = this.toggle.bind(this);

    this.state = {
      stationDetail: null,
      rentalObjects: null,
      userFavorites: [],
      popoverOpen: false
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

  toggle() {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  }

  handleFavoriteClick(e) {
    let id = this.props.match.params.id
    api.postFavorite(id)
  }

  render() {
    let favoriteButton;

    if (!api.isLoggedIn()) {

      favoriteButton =
        <div>
          <Button id="Popover1" onClick={this.toggle}>
            <FontAwesomeIcon icon="star" />
          </Button>
          <Popover placement="bottom" isOpen={this.state.popoverOpen} target="Popover1" toggle={this.toggle}>
            <PopoverHeader>Favorites</PopoverHeader>
            <PopoverBody>Sign up and log in to pin a station to your favorites.</PopoverBody>
          </Popover>
        </div>
    } else {

      favoriteButton =
        <Button id="btn-favorite" color="warning" onClick={(e) => this.handleFavoriteClick(e)}><FontAwesomeIcon icon="star" /></Button>

    }

    return (
      this.state.stationDetail && <div className="station-detail">

        <Container>
          <CardColumns>
            <Card class="detail-card" id="live-card" body inverse color="success">
              <CardTitle><strong>Live Data</strong> <FontAwesomeIcon icon="sync" /> </CardTitle>
              <CardSubtitle><u>Flinkster & CallABike</u></CardSubtitle>
              <CardText>Bikes: {this.state.rentalObjects.bikesAvailable} <br />
                Cars: {this.state.rentalObjects.carsAvailable}</CardText>
              <CardSubtitle><u>Carpark</u></CardSubtitle>
              <CardText><i class="fas fa-parking"></i>Free Spaces: <br /> {this.state.prognosesData.prognosesText}</CardText>
            </Card>
            <Card class="detail-card">
              <CardBody id="station-card">
                <CardTitle><strong><u>{this.state.stationDetail.railwaystationDetail.name}</u></strong> </CardTitle>
                <CardSubtitle>{this.state.stationDetail.railwaystationDetail.address.street} <br />
                  {this.state.stationDetail.railwaystationDetail.address.zipcode} {this.state.stationDetail.railwaystationDetail.address.city} <br /></CardSubtitle>
                <CardText></CardText>
                {favoriteButton}

              </CardBody>
            </Card>
            <Card class="detail-card">
              <CardBody id="carpark-card">
                {/* <CardImg top width="1000" src="/images/carpark-symbol.png" alt="carpark-img" /> */}
                <CardTitle><FontAwesomeIcon icon="parking" />   <strong><a target="_blank" href={this.state.stationDetail.carparkDetail.carparkUrl}>{this.state.stationDetail.carparkDetail.name}</a></strong> </CardTitle>
                <CardSubtitle><strong>Entrance:</strong> <br />{this.state.stationDetail.carparkDetail.address.street} {this.state.stationDetail.carparkDetail.address.postalCode} {this.state.stationDetail.railwaystationDetail.address.city} <br />
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
