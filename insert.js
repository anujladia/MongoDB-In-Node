var mongodb = require('mongodb');	

var mongoClient = mongodb.MongoClient;	//we need a client where interacts with the mongodb server  

/*
then we specify a url where the mongodb will recide.
we use local database at 27017 port.
say we want to create a database by the name of fruits.
*/
var url = 'mongodb://localhost:27017/fruit';

//connect method of Mongo client to set up the connection with the database 
mongoClient.connect(url, function(err, database) {
	if(err){
		console.log(err);
	} else {
		console.log("Connected with the database at: ", url);
		var db = database.db('fruit');		//use the database you want to use 
		var collection = db.collection('apples');	//create a collection in the database 

		//create documents 
		var doc1 = {name: 'red apples', color: 'red'};	
		var doc2 = {name: 'green apples', color: 'green'};

		//insert takes in two parameters
		//the array of json to be inserted
		//a callback function with err and results as parameters.
		collection.insert([doc1, doc2], function(err, res) {
			if(err) {
				console.log(err);
			} else {
				//gives the no of documents inserted in the database 
				console.log("Inserted documents is :", res.insertedCount);	
				database.close();	//close the database 
			}
		});
	}
});
