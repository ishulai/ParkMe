import React from "react";
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
//import Marker from "./Marker";

const keys = require("../../../apikeys.json");

export class MapContainer extends React.Component {
    constructor(props) {
        super(props);
        this.map = null;
    }

    componentDidUpdate() {
    }

    render() {
        const center = {
            lat: this.props.selected ? this.props.selected.lat : this.props.location.lat,
            lng: this.props.selected ? this.props.selected.lon : this.props.location.lon
        }

        return (
            <Map onClick={this.onMapClick} google={this.props.google} center={center} zoom={15}>
                {
                    this.props.locations.map((loc, i) => {
                        return (
                            <Marker
                            name={loc.name}
                            position={{lat:loc.lat,lng:loc.lon}} key={ i } />
                        );
                    })
                }
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: keys.google_maps
})(MapContainer);