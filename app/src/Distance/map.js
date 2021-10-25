import * as React from "react";

import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
const style = {
  width: "50%",
  height: "50%",
};

export class MapContainer extends React.Component {
  render() {
    return (
      <Map google={this.props.google} zoom={14} style={style}>
        <Marker
          name={"Dolores park"}
          position={{ lat: 37.759703, lng: -122.428093 }}
        />
        {/* pass distance object as a prop from index.js and use lat: this.props.distance.lat and this.props.distance.lng */}
        {/* <InfoWindow onClose={this.onInfoWindowClose}>
          <div>
            {/* <h1>{this.state.selectedPlace.name}</h1> */}
        {/* </div>
        </InfoWindow> */}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
})(MapContainer);
