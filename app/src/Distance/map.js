import * as React from "react";

import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
const style = {
  width: "50%",
  height: "50%",
};

const MapContainer = (props) => {
  console.log("hi", props.distance);
  return (
    <Map google={props.google} zoom={14} style={style}>
      {props.distance.slice(0, 3).map((element) => {
        console.log("inside", element.latitude);
        let latitude = element.latitude;
        let longitude = element.longitude;
        return (
          <Marker
            name={element.name}
            position={{ lat: latitude, lng: longitude }}
          />
        );
      })}
      <Marker name={"test"} position={{ lat: 47.71794, lng: -122.30722 }} />
      {/* pass distance object as a prop from index.js and use lat: this.props.distance.lat and this.props.distance.lng */}
      {/* <InfoWindow onClose={this.onInfoWindowClose}>
          <div>
            {/* <h1>{this.state.selectedPlace.name}</h1> */}
      {/* </div>
        </InfoWindow> */}
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
})(MapContainer);
