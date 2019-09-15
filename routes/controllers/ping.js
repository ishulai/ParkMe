module.exports = (appEnv) => {
  return {
    pingApi: (req, res) => {
      const data = req.body;
      const key = data.key;
      if (key === "hackmit123456") {
        var date = Date.now();

        const fs = require('fs');

        let rawdata = fs.readFileSync('persistence.json');

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

        function toRad(x) {
          return x * Math.PI / 180;
        }

        listOfLocations.forEach((item, i) => {
          let distance = findDistance(item.lat, item.lon, currentLat, currentLong)
          if (distance <= 5) {
            finalList.push({
              lat: item.lat,
              lon: item.lon,
              distance: distance,
              id: item.id
            });
          }
        });

        function findDistance(myLat, myLong, oLat, oLong) {
          let R = 3961;
          let dlon = toRad(oLong - myLong)
          let dlat = toRad(oLat - myLat)

          let a = Math.pow(Math.sin(dlat / 2), 2) + Math.cos(toRad(myLat)) * Math.cos(toRad(oLat)) * Math.pow(Math.sin(dlon / 2), 2);
          let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
          let distance = R * c;

          return distance;
        }

        res.send({
          locations: finalList
        });
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