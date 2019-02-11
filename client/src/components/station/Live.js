import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSync, faParking } from '@fortawesome/free-solid-svg-icons'

import React from 'react';

import api from "../../api";

library.add(faSync, faParking)

class Live extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      bikes: 0,
      cars: 0,
      prognoses: "",
    }
  }

  getLiveData(id) {
    Promise.all([
      api.getRentalObjects(id),
      api.getCarparkPrognoses(id),
    ])
      .then(live => {
        this.setState({
          bikes: live[0].bikesAvailable,
          cars: live[0].carsAvailable,
          prognoses: live[1].prognosesText,
        });
      })
      .catch(err => console.log(err));
  }

  componentDidMount() {
    this.getLiveData(this.props.id);
  }

  render() {
    const state = this.state;

    return (
      <div class="card detail-card" id="live-card">
        <div class="card-body">
          <h5 class="card-title">Live Data <FontAwesomeIcon icon={faSync} /></h5>
          <h6>Flinkster & CallABike</h6>
          <p class="card-text">Bikes: {state.bikes}</p>
          <p class="card-text">Cars: {state.cars}</p>
          <h6>Carpark <FontAwesomeIcon icon={faParking} /></h6>
          <p class="card-text">Free Spaces: {state.prognoses}</p>
        </div>
      </div>
    );
  }
}

export default Live;