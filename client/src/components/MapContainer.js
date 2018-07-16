import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

export class MapContainer extends Component {
  state = {
    isOpen: false
  }
  handleMarkerClick() {
    console.log("handleMarkerClick")
    this.setState({
      isOpen:false
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
            onClick={this.handleMarkerClick.bind(this)}
            position={{ 
              lng: marker.geographicCoordinates[0], 
              lat: marker.geographicCoordinates[1] }} 
            title={marker.name}
            name={marker.name}
            key={marker.name}
            
          >
            {false && <InfoWindow onCloseClick={this.handleInfoWindowCloseClick}>
            <div>
              <h1>TESTTESTTEST</h1>
            </div>
            </InfoWindow>}
          </Marker>
        )}
        {/* <Marker

          position={{ lat: , lng: 150.644 }}
          onClick={() => {}}
        >
          <InfoWindow onCloseClick={() => {}}>
            <div>Test</div>
          </InfoWindow>
        </Marker> */}


		<Marker
			key={1}
			position={{ lat: -34.397, lng: 150.644}}
			label={"!!!TEST MARKER!!!"}
			onClick={() => this.handleToggleOpen()}
		>

		{
			this.state.isOpen &&
		 <InfoWindow onCloseClick={this.props.handleCloseCall}>
			 <h1>SUPER TEST</h1>
		 </InfoWindow>
	 	}


		</Marker>


      </Map>

    );
  }
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo")
})(MapContainer)