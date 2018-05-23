# MongoDB In Node

This is a basic node codes that expalin how Node is connected with the mongo database. Here we will cover all the basic of mongoDB to node.  

### Topics we cover
- Basic of MongoDB
- how node is connected to the local mongoDB database  
- Database creation  
- Insertion into the Database 
- Reading the Database  
- Updating the database  
- Deleting the database  


## Basic of MongoDB  

### Installing MongoDB Locally  

-	Mongo DB is a NOSQL database   
-	It is much faster than MSQL because it works Asynchronous so it handles multiple things at the same time.  
-	Download mongoDB for windows from the mongodb.com the install it   
-	In program files you find MongoDB folder, in the bin directory you may find two files  
-	Mongo is the application that help us execute the commands for mongodb  
-	mongod is a program that runs in the background that allows us to make connection to the mongo database  
-	Then we make a folder data > db in C where the mongodb puts in all its data.  
-	Now in command prompt you run mongod first and make a connection   
-	Then in another cmd prompt you run mongo thus making it the mongo shell for executing the commands.  
-	On typing db, we get database ‘test’ that is already provided by the mongodb.  
-	*Note*: we set the path of the mongod bin into the system env Path so that mongodb is available from any directory.  

### Concept  

  `   Database -> Collections -> Documents   `
-	We have a database and each data is made up of related data called collections and each collection has actual data called documents   
-	Database can have one or more collections and each collection can have one or more documents   

### Commands

- `use testdb`  
  Use to create a database   
  If testdb doesn’t exist then it creates a db ‘testdb’, and if it exits then it will switch to the database testdb  
  
- `db`  
  To check in what current database are we in   

- `show dbs`  
  used to list all the database we have  
  In mongodb we need to insert a document into a database for it to be listed by show dbs  
  
- `db.createCollection(“Test”)`  
  This command is used to create a collection in the current database   
  
- `show collections`  
  This command is used to show all the collections present in the current database  
  
- `db.newcollection.insert({“name”: “test”})`  
  This command also creates a collection if the collection is not already present.  
  
- `db.newcollection.drop()`  
  This is used to drop the collection  
  
- `db.employees.insert()`  
  Used to insert single json data to the collection employee
  
- `db.newcollection.insert({“name”: “test”})`  
  This command also creates a collection if the collection is not already present.  

- `db.employees.find()`  
  Used to retrieve all the documents at once   
  Mongodb automatically adds a field called ObjectId to all the documents. Its mongodbs way of uniquely identifying a document. So, if you do not add this field it will add this one on its own “_id”.  
  This find() command provides the data in not so good or readable format.  

- `db.employees.find().pretty()`  
  This retrieves the mongodb documents in a pretty json format  
  
- `db.employees.findOne()`
  This retrieves the first documents in the collection  
  This command does not have a pretty extension to it.  


### Queries

```
db.employees.find({ 
  “EmpNo” : “2”
})
```
This command gives all the documents with the EmpNo as 2


```
db.employees.find({ 
  “Age” : {$lt : “30”}
})
```
This retrieves all the documents that has age less than 30.   
‘$lt’ stands for ‘Less than’  


```
db.employees.find({ 
  “Age” : {$lte : “30”}
})
```
This retrieves all the documents that has age less than equal to 30.  
‘$lte’ stands for ‘Less than Equal to’  


```
db.employees.find({ 
  “Age” : {$ne : “30”}
})
```
This retrieves all the documents that has age not equal to 30   
‘$ne’ stands for ‘Not Equal to’  


```
db.employees.find({ 
  “Skills” : “MongoDB”, “Salary”: “80000”
})
```
This retrieves all the documents that has skill of mongoDB and Salary of 80000   


```
db.employees.find({
  $or: [{"Skill": "MongoDB"}, {"Salary": "100000"}]
}).pretty()
```
This retrieves all the documents that has a skill of MongoDB or a salary of 100000  


```
db.employees.update(
  {"_id" : ObjectId("5a8b92789025560f97dc685c")},
	{$set: {"Salary": "90000"}}
)
```
This updates the document.  
It takes two parameters, first is the selection criteria that gives the document to be updated and second is the Update value, value that has to be changed goes in $set  


```
db.employees.remove({
	"_id" : ObjectId("5a8b93039025560f97dc6864")
})
```
To remove a document we use the command remove() and in it we pass a selection parameter.  


```
db.employees.find(
	{}, {"FirstName": 1}
).pretty()
```
In MongoDB to show only necessary fields we have two parameters in find.  
First parameter is the selection criteria,   
Second parameter selects the fields that are to be shown.  
In MongoDB, ‘_id’ will always be retrieved automatically until it is explicitly defined not to be shown.  
The value 1 or 0 tells that this field is to be shown or not.  
This will retrieve all the documents FirstName and Object ID  


### Operations 

```
db.employees.find(
	{}, {"FirstName": 1, "EmpNo": 1,"_id": 0}
).pretty().limit(3)
```
This retrieves only the first 3 documents of the collection.  
Limit limits the document retrieval to a particular number.  


```
db.employees.find(
	{}, {"FirstName": 1, "EmpNo": 1,"_id": 0}
).pretty().skip(3)
```
This skips the first 3 documents of the collection and retrieves all the rest documents.  
Skip skips the first n number of documents.  


```
db.employees.find(
  {}, {"FirstName": 1, "EmpNo": 1,"_id": 0}
).pretty().sort({"FirstName": 1}) 
```
This will sort the documents in the ascending order of the FirstName   
1 is for ascending order  
-1 is for descending order  


### Indexing


```
db.employees.ensureIndex({"Email": 1})
```
Indexing is a concept by which the MongoDB doesn’t have to scan all the data every time.  
This command is used to create an index on the Email field.  


```
db.employees.getIndexes()
```
This command gets all the indexes that are applied on the collection fields.  
By default, MongoDB applies an index on the ‘_id’ field  


```
db.employees.dropIndex({"Email": 1})
```
This is used to delete the index from the Email field in employee collection.  
Major use of index is when you have millions of data then querying the database will take a lot of time but with creating an index will reduce this time to fractions  
You don’t create index of every fields, because it is like recreating the whole document itself.  
Thus you create index on fields that you think are going to be unique in the documents like userId, Email Id etc.  


### Aggregate Functions

They group together the documents and perform some computation on them such that a single result can be returned.

```
db.employees.aggregate([
  {$group: {_id: "$Gender", Total: {$sum: 1} }}
])

//OUTPUT
{ "_id" : "Female", "Total" : 2 }
{ "_id" : "Male", "Total" : 3 }
```
This retrieves the sum of the number of Male and Female employees in the company  
First we use keyword $group to tell that we are going to group the documents   
Then based on what conditions is specified by the ‘_id’, and since we group based on gender hence we use $Gender   
Then once we have grouped the gender, then we find the total, here we can use anything Total or sum, so total is found by $sum which is set to 1  
This gives us the correct data  


```
db.employees.aggregate([
	{$group: {_id: "$Gender", Max_Age: {$max: "$Age"} }}
])

//OUTPUT
{ "_id" : "Female", "Max_Age" : "32" }
{ "_id" : "Male", "Max_Age" : "45" }
```
This retrieves the maximum age of the male and female in the company.  


```
db.employees.aggregate([
	{$group: {_id: "$Gender", Min_Age: {$min: "$Age"} }}
])

// OUTPUT
{ "_id" : "Female", "Min_Age" : "26" }
{ "_id" : "Male", "Min_Age" : "27" }
```
This retrieves the minimum age of the male and female in the company.  

We can also calculate the average of the Salary with $average, but average works only on the Integer values.   



## MONGODB IN NODE 


### Connecting to Mongo DB (refer file connect.js) 

-	Install the MongoDB driver for Node JS
- Run the command   
  `npm install mongodb`   
  
-	Add the require of mongodb
-	Create a client of mongodb, which will help interact with the database
-	Specify the url of the mongodb database going to be used
-	Then use the connect method of mongodb client to connect with the database which takes two parameters. First the url and second the callback.
-	Once connected it may give an error or it maybe give the successful connection 
-	Once done close the database.


### Insertion via Node (refer insert.js)

-	After connecting to the database, first switch to the database you want to use.  
-	Then create a collection where you want to add the documents.  
-	Create the JSON for the documents to be added in the database.  
-	Then call the insert method of the collection, that takes two parameters,  
    First takes in the JSON array of data,   
    Second takes a callback function which has parameters err and result  
-	Use results property insertCount to find out the number of documents that have been added   


### Finding data (refer find.js)

-	Use the find() method of the collection to find the documents.
-	Find() returns the cursor to the documents but since we need the whole documents hence we use toArray()
-	toArray() has a callback function with err and response 
-	Then we check the result for error, or maybe that the result is returned empty
-	If data is present then we actually print the result
-	Then we close the database after using.


### Updating data (refer update.js)

-	Uses the update() method of collection to update the data 
-	Takes in the selection query as the first parameter 
-	Second parameter is the value to be updated 
-	Third is the callback function of err and res


### Deleting data (refer delete.js)

-	Remove() function of collection is used to remove the document from the collection 
-	It takes in two parameters -> first is the selection query and second is the callback function with err and result



So this is it.   
Congratulation for finishing up the starter kit for MongoDB.  
Hope so you learned quiet a lot of new things of how to handle mongoDB and how to handle databases via Node.  
This is a huge step forward for you towards being a Back-end developer.  

Thank you!















