import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faParking, faWheelchair } from "@fortawesome/free-solid-svg-icons";

import React from "react";
import api from "../../api";

library.add(faParking);

class Carpark extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: "",
      url: "",

      street: "",
      zipCode: "",
      city: "",

      handicaped: 0,
      places: 0,
    }

    this.getCarpark = this.getCarpark.bind(this);
  }

  async getCarpark(id) {
    const response = await api.getRailwaystationDetails(id);

    const park = response.carparkDetail;
    const name = park.name;
    const adress = park.address;

    this.setState({
      name,
      url: park.carparkUrl,
      street: adress.street,
      zipCode: adress.postalCode,
      city: adress.cityName,
      handicaped: park.numberHandicapedPlaces,
      places: park.numberParkingPlaces,
    });
  }

  componentDidMount() {
    this.getCarpark(this.props.id);
  }

  render() {
    const state = this.state;

    return (
      <div class="card detail-card" id="carpark-card">
        <div class="card-body">
          <h5 class="card-title">
            Carpark<br />
            {state.name}
          </h5>
          <p class="card-text">
            Entrance: <br />
            {state.street} <br />
            {state.zipCode} {state.city}
          </p>
          <p><FontAwesomeIcon icon={faWheelchair} /> {state.handicaped}</p>
          <p><FontAwesomeIcon icon={faParking} /> {state.places}</p>
        </div>
      </div>
    );
  }
}

export default Carpark;