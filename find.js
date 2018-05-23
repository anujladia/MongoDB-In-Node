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

		//find() actually returns the cursor to the document 
		//since we need document itself hence we use toArray function 
		//toArray function has a callback function of err and result
		collection.find().toArray(function(err, res){	
			if(err) {			//if there is error 
				console.log(err);	
			} else if(res.length) {		//if we have documents to return i.e. we have atleast one document
				console.log(res);
			} else {				//if there is no documents to return
				console.log("No matches found");
			}
			database.close();
		});

	}
});
