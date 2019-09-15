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
      
<<<<<<< HEAD
        function findDistance (myLat, myLong, oLat, oLong) { 
  
          let R = 3961;
          let dlon = toRad(oLong - myLong)
          let dlat = toRad(oLat - myLat)
         
          let a = Math.pow(Math.sin(dlat/2), 2) + Math.cos(toRad(myLat)) * Math.cos(toRad(oLat)) * Math.pow(Math.sin(dlon/2),2);
          let c = 2 * Math.atan2( Math.sqrt(a), Math.sqrt(1-a) );
          let distance = R * c;
  
          return distance;
=======
      listOfLocations.forEach((item, i) => {
        console.log(item.lat);
        console.log(item.lon)
        console.log(findDistance(item.lat, item.lon, currentLat, currentLong));
        if (findDistance(item.lat, item.lon, currentLat, currentLong) <= 5) { 
          finalList.push({
            lat: item.lat,
            lon: item.lon
          });
>>>>>>> 26aea27b44674e8421eba4bdc6cea0a7fc139bdc
        }
  












      
<<<<<<< HEAD
        res.send(finalList);
        var jsonContent = JSON.stringify(jsonObj);
        console.log(jsonContent);
        
        fs.writeFile("output.json", jsonContent, 'utf8', function (err) {
            if (err) {
                console.log("An error occured while writing JSON Object to File.");
                return console.log(err);
            }
        
            console.log("JSON file has been saved.");
        });
=======
        //list of parking spaces lat long 
       // let collegesNearby = [[42.359516,-71.092697], [42.3770068,-71.1188488], [42.359516,-71.092697]];
        res.send({locations: finalList});
  
>>>>>>> 26aea27b44674e8421eba4bdc6cea0a7fc139bdc
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