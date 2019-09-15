const googleMapsClient = require('@google/maps').createClient({
    key: require("../../apikeys.json")["google_maps"]
});


module.exports = (appEnv) => {
    return {
        pingApi: (req, res) => {
            const data = req.body;
            const key = data.key;

            console.log(req.body)
            console.log("img:" + data.image);
            
            if (data.key === null){ 
                console.log("key not sent");
            } else if (data.image === null) {
                console.log("key not sent");
            } else if (data.location === null) { 
                console.log("key was not sent")
            }
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
                var request = require('request');

                //send the image via base64 text 

                const img = data.image;
                const currentLocation = data.location;

                let currentLat = currentLocation.lat;
                let currentLong = currentLocation.lon;


                let locationFile = JSON.parse(rawdata);

                let lol = locationFile.list;
                this.listOfLocations = locationFile.list;


                var that = this;

                request.post(
                    'https://parkme.localtunnel.me/b64',
                    { json: { image: data.image, location: currentLocation, key: key }},
                    function (error, response, body) {
                        if (!error && response.statusCode == 200) {
                            console.log(body);
                            if (this.body.result === "left" || this.body.result === "right") {
                                if(farEnough(listOfLocations, currentLocation)){
                                    that.listOfLocations.push({lat: currentLocation.lat, lon: currentLocation.lon, active: 1, id: String});
                                }
                            } else {

                            }
                            
                        }else{ 
                            console.log(error, response, body);
                        }
                    }
                );

                function farEnough (listOfLocations, currentLocation) {
                    for(let i = 0; i < listOfLocations.length; i++) { 
                        if (findDistance(listOfLocations[i].lat, listOfLocations[i].lon, currentLocation.lat, currentLocation.lon) <= .05){
                            return false;
                        }
                    }
                    return true; 
                }
                let jsonWrite = {"list" :  this.listOfLocations}
                let jsonString = JSON.stringify(jsonWrite); 

                fs.writeFile('persistence.json', jsonString, (err) => {
                    // throws an error, you could also catch it here
                    if (err) throw err;
                
                    // success case, the file was saved
                    console.log('JSON saved!');
                });

                let finalList = [];

                const populate = index => {
                    if(lol.length > index) {
                        const item = lol[index];
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