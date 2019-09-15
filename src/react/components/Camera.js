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
          <div>
            <Webcam
              audio={false}
              height={0}
              ref={this.setRef}
              screenshotFormat="image/jpeg"
              width={0}
              videoConstraints={videoConstraints}
            />
            <div></div>
            <div>
                { /*this.state.screenshot ? <img src = {this.state.screenshot}/> : */""}
            </div>
          </div>
        );
      }
    

}

export default Camera;