'use strict';
/* 
  Import modules/files you may need to correctly run the script. 
  Make sure to save your DB's uri in the config file, then import it with a require statement!
 */
var fs = require('fs'),
    mongoose = require('mongoose'), 
    Schema = mongoose.Schema, 
    Listing = require('./ListingSchema.js'), 
    config = require('./config'),
    listingData;

/* Connect to your database using mongoose - remember to keep your key secret*/
//see https://mongoosejs.com/docs/connections.html
//See https://docs.atlas.mongodb.com/driver-connection/

mongoose.connect('mongodb+srv://guest:8VwK8n23iCyGasER@cen3031-course-hiulj.mongodb.net/Bootcamp2');

/*var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));*/

/* 
  Instantiate a mongoose model for each listing object in the JSON file, 
  and then save it to your Mongo database 
  //see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach

  Remember that we needed to read in a file like we did in Bootcamp Assignment #1.
 */
fs.readFile('listings.json', 'utf8', function(err,schema){
  if(err) throw err;
  listingData = JSON.parse(schema);
  //console.log(listingData);
  /*var modelSchema = mongoose.model('entries', schema)
  modelSchema.forEach(function(modelSchema){
    console.log(modelSchema);
  });*/
  listingData.entries.forEach(function(element){
    new Listing(element).save(function(err){
      if(err) throw err;
      //console.log('Document saved');
    });
  });

});


/*  
  Check to see if it works: Once you've written + run the script, check out your MongoLab database to ensure that 
  it saved everything correctly. 
 */