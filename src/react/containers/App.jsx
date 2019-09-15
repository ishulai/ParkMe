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
            locations: [],
            screenshot: null
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
<<<<<<< HEAD
        return (
            <div className="App">        
                {/* <Map locations={ this.state.locations }></Map> */}
                <Camera />
=======
        return !this.props.isGeolocationAvailable ? (
            <div>Your browser does not support Geolocation</div>
        ) : !this.props.isGeolocationEnabled ? (
            <div>Geolocation is not enabled</div>
        ) : this.props.coords ? (
            <div className="App">
                <MapContainer locations={ this.state.locations }></MapContainer>
                <Locations locations={ this.state.locations }></Locations>
>>>>>>> fa564a493d59a0b5a4f52c42422b4328565c9931
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