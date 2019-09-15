import React from "react";
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

const keys = require("../../../apikeys.json");

export class MapContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    setPoints(points) {
        // points looks like this:
        // [{lat: 123.456, lon: 123.456}, {}, ...]
        // show nearby parking spots on map
    }

    render() {
        return (
            <Map google={this.props.google} initialCenter={{ lat: 40.854885, lng: -88.081807 }} zoom={15} />
        );
    }
}

export default GoogleApiWrapper({
    apiKey: keys.google_maps
})(MapContainer);