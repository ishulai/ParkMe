import React, { Component } from 'react';
import Camera from "../components/Camera";
import Request from "../classes/Request";
import MapContainer from "../components/MapContainer";
import Locations from "../components/Locations";
import { geolocated } from "react-geolocated";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locations: []
        }
        this.timer = null;
        this.camera = new Camera();
    }

    getLocation() {
        return {
            lat: this.props.coords.latitude,
            lon: this.props.coords.longitude
        }
    }

    componentDidMount() {
        this.timer = setInterval(() => {
            const img = this.camera.getPicture();
            const loc = this.getLocation();
            Request.ping(img, loc).then(res => {
                console.log(res);
                this.setState({
                    locations: res.locations
                });
            });
        }, 2000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render() {
        return !this.props.isGeolocationAvailable ? (
            <div>Your browser does not support Geolocation</div>
        ) : !this.props.isGeolocationEnabled ? (
            <div>Geolocation is not enabled</div>
        ) : this.props.coords ? (
            <div className="App">
                <MapContainer locations={ this.state.locations }></MapContainer>
                <Locations locations={ this.state.locations }></Locations>
            </div>
        ) : (
            <div>Getting the location data&hellip; </div>
        );
    }
}

export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
})(App);