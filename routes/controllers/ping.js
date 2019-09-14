module.exports = (appEnv) => {
  return {
    pingApi: (req, res) => { 

      var firebase = require("../../util/database");


      //process image by making an api call to google vision 
      var cv = require("../../util/googlevision");

      //send the image via base64 text 

      const img = req.image;
      const location = req.location; 
      const key = req.key;
      var date = Date.now(); 

      res.send()

    },
    
    default: (req, res) => {

      //homepage

      res.sendFile("index.html");

    }
  }
}