//set up routes

var mongoose = require('mongoose');
var User = require('./model.js');

module.exports = function(app){

  //GET routing 

  //retrieving list of all users from DB
  app.get('/users', function(req,res){

    //call find method on schema User
    var query = User.find({});

    query.exec(function(err,users){
      if (err) res.send(err);
      //responds with json formatted list of all users
      res.json(users);
    });

  });

  //POST routing

  //method for posting a new user to DB
  app.post('/users',function(req,res){
    console.log('here')
    //create a new user using the User model constructor
    var newuser = new User(req.body);

    newuser.save(function(err){
      if (err) res.send(err);

      //respond with the new user
      console.log('sucess', newuser)
      res.json(req.body);
    });

  });

}