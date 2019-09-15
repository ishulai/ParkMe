const googleMapsClient = require('@google/maps').createClient({
    key: require("../../apikeys.json")["google_maps"]
});

module.exports = (appEnv) => {
    return {
        pingApi: (req, res) => {
            const data = req.body;
            const key = data.key;
            if (key === "hackmit123456") {
                var date = Date.now();

                const fs = require('fs');

                let rawdata = fs.readFileSync('persistence.json');

                const findDistance = (myLat, myLong, oLat, oLong) => {
                    const toRad = x => x * Math.PI / 180;

                    let R = 3961;
                    let dlon = toRad(oLong - myLong)
                    let dlat = toRad(oLat - myLat)

                    let a = Math.pow(Math.sin(dlat / 2), 2) + Math.cos(toRad(myLat)) * Math.cos(toRad(oLat)) * Math.pow(Math.sin(dlon / 2), 2);
                    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                    let distance = R * c;

                    return distance;
                }

                const getName = (lat, lon, callback) => {
                    var request = {
                        latlng: {
                            lat: lat,
                            lng: lon
                        }
                    };

                    googleMapsClient.reverseGeocode(request, (err, response) => {
                        if (!err) {
                            callback(response.json.results[0].formatted_address);
                        }
                    });
                }

                //process image by making an api call to google vision 
                var cv = require("../../util/googlevision");

                //send the image via base64 text 

                const img = data.image;
                const currentLocation = data.location;

                let currentLat = currentLocation.lat;
                let currentLong = currentLocation.lon;

                let locationFile = JSON.parse(rawdata);

                let listOfLocations = locationFile.list;
                let finalList = [];

                const populate = index => {
                    if(listOfLocations.length > index) {
                        const item = listOfLocations[index];
                        const distance = findDistance(item.lat, item.lon, currentLat, currentLong)
                        if (distance <= 5) {
                            getName(item.lat, item.lon, name => {
                                finalList.push({
                                    lat: item.lat,
                                    lon: item.lon,
                                    distance: distance,
                                    id: item.id,
                                    name: name
                                });
                                populate(index + 1);
                            });
                        }
                    } else {
                        res.send({
                            locations: finalList
                        });
                    }
                }

                populate(0);
            } else {
                res.send({
                    error: "done"
                });
            }
        },
        default: (req, res) => {
            //homepage
            res.sendFile("index.html");
        }
    }
}