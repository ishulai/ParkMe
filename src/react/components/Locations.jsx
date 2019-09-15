import React from "react";

class Locations extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return this.props.locations ? (
            <div className="locations">
                {
                    this.props.locations.map((loc, i) => {
                        return (
                            <div className="item" key={ i }>{loc.lon + " " + loc.lat}</div>
                        );
                    })
                }
            </div>
        ) : (
            <div></div>
        );
    }
}

export default Locations;