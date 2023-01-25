var express = require('express');
var router = express.Router();
var path = require('path');
const svgCaptcha = require('svg-captcha')
const cookieParase = require('cookie-parser')
const {set,get} =require( '../utils/redis')
const redis = require('../utils/redis');
const UUID = require('uuid')
const fs = require("fs");
const template = require("art-template");

router.get('/index',function(req,res,next){
     //res.sendFile(path.resolve('public/html','index.html'))
    // res.sendFile(path.resolve('routes','index.html'))
    //res.sendFile(path.resolve('views','index.html'))
    // res.send('hhhh')



     fs.readFile( "public/html/index.html", (err, data) => {
          if (err) {
               console.log(err);
          } else {
               let resoult = template.render(data.toString());
               res.send(resoult);
          }
     });

})






module.exports = router;