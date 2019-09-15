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
            screenshot: null,
            selected: null
        }
        this.timer = null;
        this.displayScreenshot = this.displayScreenshot.bind(this);
        this.ping = this.ping.bind(this);
        this.map = null;
    }

    getLocation() {
        return {
            lat: this.props.coords.latitude,
            lon: this.props.coords.longitude
        }
    }

    ping() {
        const img = this.state.screenshot;
        const loc = this.getLocation();
        Request.ping(img, loc).then(res => {
            this.setState({
                locations: res.locations
            });
        });
    }

    displayScreenshot(getPicture, webcam) {
        this.setState(prevState => ({
          screenshot: getPicture(webcam)
        }), 
        () => {
            this.ping();
        });
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    selectLocation(selected) {
        this.setState({
            selected: selected
        });
    }

    render() {
        return !this.props.isGeolocationAvailable ? (
            <div>Your browser does not support Geolocation</div>
        ) : !this.props.isGeolocationEnabled ? (
            <div>Geolocation is not enabled</div>
        ) : this.props.coords ? (
            <div className="App">
                <Camera displayScreenshot={this.displayScreenshot}/>
                <MapContainer ref={map => this.map = map} locations={ this.state.locations } location={ this.getLocation() } selected={this.state.selected}></MapContainer>
                <Locations locations={ this.state.locations } selectLocation={loc => this.selectLocation(loc)}></Locations>
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