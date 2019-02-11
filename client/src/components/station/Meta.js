import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

import React from "react"

import { Button, Popover, PopoverHeader, PopoverBody } from "reactstrap";
import api from "../../api";

library.add(faStar);

class Meta extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: "",
      street: "",
      zipCode: "",
      city: "",

      popoverOpen: false
    }

    this.getMeta = this.getMeta.bind(this);
    this.togglePopOver = this.togglePopOver.bind(this);
  }

  async getMeta(id) {
    const response = await api.getRailwaystationDetails(id);

    const name = response.railwaystationDetail.name;
    const adress = response.railwaystationDetail.address;

    this.setState({
      name,
      street: adress.street,
      zipCode: adress.zipcode,
      city: adress.city,
    });
  }

  togglePopOver() {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  }

  saveFavorite(e) {
    e.preventDefault();

    const id = this.props.id
    api.postFavorite(id)
  }

  componentDidMount() {
    this.getMeta(this.props.id);
  }

  render() {
    const state = this.state;

    return (
      <div class="card detail-card" id="live-card">
        <div class="card-body">
          <h5 class="card-title">{state.name}</h5>
          <p class="card-text">{state.street} <br />
            {state.zipCode} {state.city}
          </p>
          {this.renderFavoriteButton()}
        </div>    
      </div>
    );
  }

  renderFavoriteButton() {
    if (!api.isLoggedIn()) {
      return (
        <div>
          <Button class="btn" id="Popover1" onClick={this.togglePopOver}>
            <FontAwesomeIcon icon="star" />
          </Button>
          <Popover placement="bottom" isOpen={this.state.popoverOpen} target="Popover1" toggle={this.togglePopOver}>
            <PopoverHeader>Favorites</PopoverHeader>
            <PopoverBody>Sign up and log in to pin a station to your favorites.</PopoverBody>
          </Popover>
        </div>
      )
    } else {
      return (
        <Button id="btn-favorite" color="warning" onClick={(e) => this.saveFavorite(e)}><FontAwesomeIcon icon="star" /></Button>
      )
    }
  }
}

export default Meta;