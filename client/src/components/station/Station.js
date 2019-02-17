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
import Carpark from "./Carpark";

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
            <Carpark id={id} />
          </CardColumns>
        </Container>
      </div>
    );
  }
}

export default Station;
