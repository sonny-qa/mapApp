var mongoose = require('mongoose');

var Schema = mongoose.Schema;

//define users schema
var UserSchema = new Schema ({
  username: {type: String, required: true},
  gender: {type: String, required: true},
  age: {type: Number, required: true},
  favlang: {type: String, required: true},
  location: {type: [Number], required: true}, //an array [long,lat] gMaps requires in: [lat,long]
  htmlverified: String,
  created_at: {type: Date, Default: Date.now()},
  updated_at: {type: Date, Default: Date.now()}

});

//immediately prior to a save operation, capture the data for created updated_at
UserSchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  //if we are mcreating a document for the first time
  if (!this.created_at){
    this.created_at = now;
  }
  next();
});

//index the location field in 2dsphere format
UserSchema.index({location: "2dsphere"});

//create a model constructor from schema and export the Schema. 
//the model 'Scotch-User' creates the 'Scotch-Users' collection

module.exports = mongoose.model('Scotch-User',UserSchema);