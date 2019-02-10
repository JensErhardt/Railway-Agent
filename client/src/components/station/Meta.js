import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

import React from "react"

import { Card, CardBody, Button, CardTitle, CardText, CardSubtitle, Popover, PopoverHeader, PopoverBody } from "reactstrap";
import api from "../../api";

library.add(faStar);

class Meta extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      popoverOpen: false
    }

    this.togglePopOver = this.togglePopOver.bind(this);
  }

  togglePopOver() {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  }

  handleFavoriteClick(e) {
    e.preventDefault();

    const id = this.props.id
    api.postFavorite(id)
  }

  render() {
    const props = this.props;

    return (
      <Card class="detail-card">
        <CardBody id="station-card">
          <CardTitle><strong><u>{props.name}</u></strong> </CardTitle>
          <CardSubtitle>{props.street} <br />
            {props.zipcode} {props.city} <br /></CardSubtitle>
          <CardText></CardText>
          {this.renderFavoriteButton()}
        </CardBody>
      </Card>
    );
  }

  renderFavoriteButton() {
    if (!api.isLoggedIn()) {
      return (
        <div>
          <Button id="Popover1" onClick={this.toggle}>
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
        <Button id="btn-favorite" color="warning" onClick={(e) => this.handleFavoriteClick(e)}><FontAwesomeIcon icon="star" /></Button>
      )
    }
  }
}

export default Meta;