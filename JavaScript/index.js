const express = require('express');
const https=require('https');
const bodyParser=require("body-parser")

const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.listen(3000,function(){
    console.log('Server is Running');
})


app.get("/", function(req, res) {
    res.sendFile("C:/Users/Saransh/Desktop/Web Dev Projects/Weather_Web/HTML/index.html")  
}) 

app.post("/",function(req,res){
    var location=req.body.CityName;
    console.log(location);
    var apiKey='27795ce922e262e40fe837a780a624e1';
    const url='https://api.openweathermap.org/data/2.5/weather?q=' + location + '&appid=' + apiKey;
    https.get(url, function(response){
        response.on('data' ,function(data){
            var weatherData=JSON.parse(data);
            var weatherIcon=weatherData.weather[0].icon;
            var temp=weatherData.main.temp;
            const imageUrl="http://openweathermap.org/img/wn/"+weatherIcon+"@2x.png";
            res.write('<head><meta charset="utf-8"></head>');
            //req.write("<p>The Temperature in" + location + "is" + temp + "<p>");
            res.write("<img src=" + imageUrl +">");
            res.end();
        }) 
    })
})
