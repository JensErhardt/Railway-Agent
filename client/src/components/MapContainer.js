import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

export class MapContainer extends Component {

  render() {
    const style = {
      width: 500,
      height: 500
    }

    return (
      <Map
        google={this.props.google}
        zoom={5.5}
        initialCenter={{
          lat: 51.0377345,
          lng: 10.4124887
        }}
        style={style}
      >
        {this.props.stations.map((marker) =>
          <Marker
            onClick={this.onMarkerClick}
            position={{ 
              lng: marker.geographicCoordinates[0], 
              lat: marker.geographicCoordinates[1] }} 
            title={marker.name}
            name={marker.name}
          />
        )}

        <InfoWindow onClose={this.onInfoWindowClose}>
          <div>
            <h1>TESTTESTTEST</h1>
          </div>
        </InfoWindow>

      </Map>

    );
  }
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo")
})(MapContainer)