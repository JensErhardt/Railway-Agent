import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faParking } from "@fortawesome/free-solid-svg-icons";

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
    console.log(park)

    this.setState({
      name,
      url: park.carparkUrl,
      street: adress.street,
      zipCode: adress.zipcode,
      city: adress.cityName,
      handicaped: park.numberHandicapedPlaces,
      places: park.numberParkingPlaces,
    })
  }

  componentDidMount() {
    this.getCarpark(this.props.id);
  }
  
  render () {
    return (
      <h1>Carpark</h1>
    );
  }
}

export default Carpark;