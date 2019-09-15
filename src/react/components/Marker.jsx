import React from "react";

class Marker extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="marker"
                style={{ background: "blue", cursor: "pointer"}}
                title={this.props.name}
            />
        )
    }
}

export default Marker;