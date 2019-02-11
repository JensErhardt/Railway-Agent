import React from 'react';
import api from '../../api';
import {
  Button, Container, Card, CardTitle, CardText, CardColumns,
  CardSubtitle, CardBody, Popover, PopoverHeader, PopoverBody
} from 'reactstrap';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faParking, faWheelchair, faSync, faStar } from '@fortawesome/free-solid-svg-icons'
import './station.css';

import Live from "./Live";
import Meta from "./Meta";

library.add(faParking, faWheelchair, faSync, faParking, faStar)

class Station extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      stationDetail: null,
      rentalObjects: null,
      userFavorites: [],
      prognosesData: null,
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

  render() {
    const id = this.props.match.params.id;
    
    return (
      this.state.stationDetail && <div className="station-detail">
        <Container>
          <CardColumns>
            <Live id={id} />
            <Meta id={id} />
            {this.renderCarpark()}
          </CardColumns>
        </Container>
      </div>
    );
  }

  renderCarpark() {
    return (
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
    )
  }
}

export default Station;
