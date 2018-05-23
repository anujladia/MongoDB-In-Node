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

		//update function is used to update the documents 
		//takes in the seslection query, the updated data,
		//third parameter is the callback function of err and result
		collection.update({'name': 'red apples'}, {$set: {'color': 'blue'}}, function(err, res){
			if(err){
				console.log(err);
			} else {
				console.log("Updated Successfully");
			}
			database.close();
		});
	}
});
