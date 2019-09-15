import React from "react";


const keys = require("../../../apikeys.json");


class Locations extends React.Component {
    constructor(props) {
        super(props);
        this.placeName = "";
    }

  

    getName(lat, long){ 

        myLatLng = new google.maps.LatLng({lat: lat, lng: long}); 

        var request = {
            query: 'Museum of Contemporary Art Australia',
            fields: ['name', 'geometry'],
            locationBias: myLatLng
        };
        
        
        service.findPlaceFromQuery(request, (results, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                this.placeName = results[0].name;
            }
        });
    
    }

    render() {
        console.log(this.props);
        return this.props.locations ? (
            <div className="locations">
                {
                    this.props.locations.map((loc, i) => {
                        return (
                            <div className="item" key={ i }>
                                <div className="name">{ this.getName(loc.lat, loc.lon) } </div>
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