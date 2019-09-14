module.exports = (appEnv) => {
  return {
    pingApi: (req, res) => { 


      const fs = require('fs');

      let rawdata = fs.readFileSync('persistence.json');
     

      //process image by making an api call to google vision 
      var cv = require("../../util/googlevision");

      //send the image via base64 text 

      const img = req.query.image;
      const currentLocation = req.query.location; 
      const key = req.query.key;


      let currentLat = currentLocation.lat; 
      let currentLong = currentLocation.long; 

      let locationFile = JSON.parse(rawdata);

      let listOfLocations = locationFile.list; 
      let finalList = []; 
      
      listOfLocations.forEach((item, i) => {
        
        if (findDistance(item.lat, item.long, currentLat, currentLong) <= 5) { 
          finalList.push([item.lat, item.long]);
        }

      });

      function findDistance (myLat, myLong, oLat, oLong) { 

        let R = 3961;
        let dlon = oLong - myLong
        let dlat = oLat - myLat
       
        let a = Math.pow(Math.sin(dlat/2), 2) + Math.cos(myLat) * Math.cos(oLat) * Math.pow(Math.sin(dlon/2),2);
        let c = 2 * Math.atan2( Math.sqrt(a), Math.sqrt(1-a) )
        let distance = R * c 

        return distance;
        //return Math.sqrt(Math.pow(myLat - oLat, 2) + Math.pow(myLong - oLong, 2));
      }

      console.log(req);

      if( key === "hackmit123456" ){ 

        var date = Date.now();
      
        //list of parking spaces lat long 
       // let collegesNearby = [[42.359516,-71.092697], [42.3770068,-71.1188488], [42.359516,-71.092697]];
        res.send(finalList);
  
      } else { 
        res.send({error:"done"});
      }

    },
    
    default: (req, res) => {

      //homepage

      res.sendFile("index.html");

    }
  }
}