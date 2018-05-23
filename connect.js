var mongodb = require('mongodb');	

var mongoClient = mongodb.MongoClient;	//we need a client where interacts with the mongodb server  

/*
then we specify a url where the mongodb will recide.
we use local database at 27017 port.
say we want to create a database by the name of fruits.
*/
var url = 'mongodb://localhost:27017/fruit';

//connect method of Mongo client to set up the connection with the database 
mongoClient.connect(url, function(err, db) {
	if(err){
		console.log(err);
	} else {
		console.log("Connected with the database at: ", url);
		db.close();
	}
});
