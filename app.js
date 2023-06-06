const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
})
app.post("/", function (req, res) {
  const query = req.body.cityName;
  const units = req.body.units;
  const appid = "eda323e7a0a80209b154035c5457b0db";
  const url = "https://api.openweathermap.org/data/2.5/weather?units=" + units + "&q=" + query + "&appid=" + appid;

   https.get(url, function (response) {
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const weatherIcon = weatherData.weather[0].icon;
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const iconURL = "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png"; 
      console.log(weatherDescription);
      res.write("<p>The weather is currently</p>" + '<img src="' + iconURL + '">');
      res.write("<h1>Temperature in " + query + " is " + temp + " degrees Celcius</h1>"  );
      res.send();
    })
  });
})
/*
 

*/

app.listen(3000, function () {
  console.log("Server is running on port 3000.");
})
