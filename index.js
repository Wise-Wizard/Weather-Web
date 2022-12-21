const express = require('express');
const https=require('https');

const app=express();

app.listen(3000,function(){
    console.log('Server is Running');
})


app.get("/", function(req, res) {

    const url='https://api.openweathermap.org/data/2.5/weather?q=Bengaluru&appid=27795ce922e262e40fe837a780a624e1'
    https.get(url,function(response){
        response.on('data' ,function(data){
            var weatherData=JSON.parse(data);
            var weatherIcon=weatherData.weather[0].icon;
            const imageUrl="http://openweathermap.org/img/wn/"+weatherIcon+"@2x.png";
           
            res.write('<head><meta charset="utf-8"></head>');
            res.write("<img src=" + imageUrl +">");
            //res.write(weatherData.main.temp);
            res.send();
        })
       
    })
   
}) 
