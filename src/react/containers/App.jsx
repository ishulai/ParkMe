import React, { Component } from 'react';
import Camera from "../components/Camera";
import Request from "../classes/Request";
import Map from "../components/Map";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locations: []
        }
        this.timer = null;
        this.camera = new Camera();
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
        return (
            <div className="App">        
                <Map locations={ this.state.locations }></Map>
            </div>
        );
    }
}

export default App;