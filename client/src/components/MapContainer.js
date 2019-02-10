import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

export class MapContainer extends Component {
  state = {
    isOpen: false,
    activeMarker: null,
    activeStation: {}
  }

  handleMarkerClick(props, marker, e) {
    this.setState({
      isOpen: true,
      activeMarker: marker,
      activeStation: {
        name: props.name,
        _id: props._id
      }
    })
  }

  handleToggleOpen = () => {
    this.setState({
      isOpen: true
    });
  }

  handleToggleClose = () => {
    this.setState({
      isOpen: false
    });
  }

  render() {
    return (
      <div>
        <Map
          google={this.props.google}
          zoom={5.5}
          initialCenter={{
            lat: 51.0377345,
            lng: 10.4124887
          }}
        >
          {this.props.stations.map((marker) =>
            <Marker
              onClick={this.handleMarkerClick.bind(this)}
              position={{
                lng: marker.geographicCoordinates[0],
                lat: marker.geographicCoordinates[1]
              }}
              title={marker.name}
              name={marker.name}
              key={marker.name}
              _id={marker._id}
            />
          )}
          <InfoWindow marker={this.state.activeMarker} visible>
            <br /><p>
              <strong>{this.state.activeStation.name}</strong>
            </p>
            <a href={"/stations/" + this.state.activeStation._id}>Show Details and live data</a>
          </InfoWindow>
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyCbBJPvYIaR5ozIx_0-uWiGeO9cK4IxHww")
})(MapContainer)