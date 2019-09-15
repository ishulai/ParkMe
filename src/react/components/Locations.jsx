import React from "react";

class Locations extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props);
        return this.props.locations ? (
            <div className="locations">
                {
                    this.props.locations.map((loc, i) => {
                        return (
                            <div className="item" key={ i }>
                                <div className="name">MIT</div>
                                <div className="distance">{ Math.round(loc.distance * 10) / 10 } miles</div>
                            </div>
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