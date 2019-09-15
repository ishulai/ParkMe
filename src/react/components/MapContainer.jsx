import React from "react";
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

const keys = require("../../../apikeys.json");

export class MapContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidUpdate() {
        this.render();
    }

    render() {
        return (
            <Map google={this.props.google} initialCenter={{ lat: this.props.location.lat, lng: this.props.location.lon }} zoom={15}>
                {
                    this.props.locations.map((loc, i) => {
                        return (
                            <Marker
                            title={'The marker`s title will appear as a tooltip.'}
                            name={'SOMA'}
                            position={{ lat: loc.lat, lng: loc.lng }} key={ i } />
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