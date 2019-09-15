module.exports = (appEnv) => {
  return {
    pingApi: (req, res) => { 



      if(key === "hackmit123456" ){ 

        var date = Date.now();



        const fs = require('fs');

        let rawdata = fs.readFileSync('persistence.json');
       
  
        //process image by making an api call to google vision 
        var cv = require("../../util/googlevision");
  
        //send the image via base64 text 
        const data = req.body; 
  
        const img = data.image;
        const currentLocation = data.location; 
        const key = data.key;
  
  
        let currentLat = currentLocation.lat; 
        let currentLong = currentLocation.lon; 
  
        let locationFile = JSON.parse(rawdata);
  
        let listOfLocations = locationFile.list; 
        let finalList = []; 
        console.log(listOfLocations);
        
        listOfLocations.forEach((item, i) => {
          console.log(item.lat);
          console.log(item.lon)
          console.log(findDistance(item.lat, item.lon, currentLat, currentLong));
          if (findDistance(item.lat, item.lon, currentLat, currentLong) <= 5) { 
            finalList.push([item.lat, item.lon]);
          }
        });
  
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