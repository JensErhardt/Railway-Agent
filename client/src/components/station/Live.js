import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSync, faParking } from '@fortawesome/free-solid-svg-icons'

import React from 'react';

import { Card, CardTitle, CardText, CardSubtitle } from 'reactstrap';

library.add(faSync, faParking)

class Live extends React.PureComponent {
  render() {
    return (
      <Card class="detail-card" id="live-card" body inverse color="success">
        <CardTitle><strong>Live Data</strong> <FontAwesomeIcon icon="sync" /> </CardTitle>
        <CardSubtitle><u>Flinkster & CallABike</u></CardSubtitle>
        <CardText>Bikes: {this.props.bikes} <br />
          Cars: {this.props.cars}</CardText>
        <CardSubtitle><u>Carpark</u></CardSubtitle>
        <CardText><i class="fas fa-parking"></i>Free Spaces: <br /> {this.props.prognoses}</CardText>
      </Card>
    );
  }
}

export default Live;