//set up routes

var mongoose = require('mongoose');
var Tool = require('./model.js');

module.exports = function(app){

  //GET routing 

  //retrieving list of all users from DB
  app.get('/items', function(req,res){
  
    //call find method on schema User
    var query = Tool.find({});

    query.exec(function(err,tools){
      if (err) res.send(err);
      //responds with json formatted list of all users
      res.json(tools);
    });

  }),

  // POST routing

  //method for posting a new user to DB
  app.post('/items',function(req,res){
    console.log('here')
    //create a new user using the User model constructor
    var newtool = new Tool(req.body);

    newtool.save(function(err){
      if (err) res.send(err);
 
      //respond with the new user
      console.log('sucess', newtool)
      res.json(req.body);
    });

  });

}