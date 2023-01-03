const express = require("express");
const app = express();
const https = require("https");

app.get('/', function (req, res) {
    const url =
      "https://api.openweathermap.org/data/2.5/weather?q=srikakulam&units=metric&appid=0c105c4027bd5b1dda38ce1c8cd64c3c";
    https.get(url, function (resp) {
        console.log(resp.statusCode);
        resp.on("data",function(data){
            const weatherData = JSON.parse(data);
            const weatherDiscreption = weatherData.weather[0].description;
            const temp = weatherData.main.temp;
            const icon = weatherData.weather[0].icon
            const URL = "https://openweathermap.org/img/wn/"+icon+"@2x.png"
            res.set("Content-Type", "text/html");
            res.write(`<h2>weather discripton : ${weatherDiscreption}</h2>`);
            res.write(`<h2>today temperate is ${temp} degree celcius</h2>`);
            res.write(`<img src="${URL}">`);
            res.send()
        })
    })
})  

app.listen(3000, function () {
    console.log("server is running at port number 3000");
})