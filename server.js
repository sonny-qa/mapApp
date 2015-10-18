// handle GET and POST requests

var express = require('express');
var mongoose = require('mongoose');
var uriUtil = require('mongodb-uri')
var port = process.env.PORT || 3000;
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
require('./app/routes.js'); //include routes


var app = express();

//db credentials
// var dbuser = 'arthur';
// var dbpassword = 'arthur';


// var uristring = process.env.MONGOLAB_URI || 
// process.env.MOGOHQ_URL ||
// 'mongodb://' + dbuser + ':' + dbpassword + '@ds039674.mongolab.com:39674/heroku_wtk9d4hm';

// var mongooseUri = uriUtil.formatMongoose(uristring);

// var options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }, 
// replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } } }; 

//setup mongoose connection
mongoose.connect("mongodb://localhost/Mapapp");

//mount middleware
app.use(express.static(__dirname + '/public')); //static components folder
app.use('/bower_components',express.static(__dirname + '/bower_components'));
app.use(bodyParser.json()); //to parse json
app.use(bodyParser.urlencoded({extended:true})); //parse Urls using the qs library
app.use(bodyParser.text()); //parse all bodys as strings
app.use(bodyParser.json({type: 'application/vnd.api+json'})); //to parse api responses
app.use(methodOverride()); //override requests to the server, override the req.method property



app.listen(port);
console.log('listening on port: ',port);

