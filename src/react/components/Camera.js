import React, { Component } from 'react';
import Webcam from 'react-webcam';

class Camera extends React.Component{
    constructor(props) {
        super(props);
        this.state = { screenshot: null };
        this.setRef = this.setRef.bind(this);
        this.getPicture = this.getPicture.bind(this);
        this.INTERVAL = 1500;
    }

    setRef(webcam) {
        this.webcam = webcam;
    };

    getPicture(webcam) {
        const screenshot = webcam.getScreenshot();
        console.log()
        this.setState({screenshot: screenshot});
        return screenshot
    }

    componentDidMount() {
        this.interval = setInterval(() => this.props.displayScreenshot(this.getPicture, this.webcam), this.INTERVAL);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }
    
    render() {
        const videoConstraints = {
        width: 1280,
        height: 1200,
        facingMode: "user"
    };
    
        return (
          <div style={{position: "absolute", top: "-1000px"}}>
            <Webcam 
              audio={false}
              height={350}
              ref={this.setRef}
              screenshotFormat="image/jpeg"
              width={350}
              videoConstraints={videoConstraints}
            />
            <div>
                { this.state.screenshot ? <img src = {this.state.screenshot}/> : ""}
            </div>
          </div>
        );
      }
    

}

export default Camera;