import React from "react";

const keys = require("../../../apikeys.json");


class Locations extends React.Component {
    constructor(props) {
        super(props);
        this.placeName = "";
    }

    render() {
        return this.props.locations ? (
            <div className="locations">
                {
                    this.props.locations.map((loc, i) => {
                        return (
                            <div className="item" key={ i } onClick={() => this.props.selectLocation(loc)}>
                                <div className="name">{ loc.name } </div>
                                <div className="distance">{ Math.round(loc.distance * 10) / 10 } miles away</div>
                            </div>
                        );
                    })
                }
            </div>
        ) : (
            <div style={{display: "none"}}></div>
        );
    }
}

export default Locations;