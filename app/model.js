var mongoose = require('mongoose');

var Schema = mongoose.Schema;

//define users schema
var ToolSchema = new Schema ({
  description: {type: String},
  latitude: {type: Number},
  longitude: {type: Number},//an array [long,lat] gMaps rexsquires in: [lat,long]
  created_at: {type: Date, default: Date.now()},
  updated_at: {type: Date, default: Date.now()}

});

//immediately prior to a save operation, capture the data for created updated_at
ToolSchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  //if we are mcreating a document for the first time
  if (!this.created_at){
    this.created_at = now;
  }
  next();
});

//index the location field in 2dsphere format
ToolSchema.index({location: "2dsphere"});

//create a model constructor from schema and export the Schema. 
//the model 'Scotch-User' creates the 'Scotch-Users' collection

module.exports = mongoose.model('tools',ToolSchema);