// const MongoClient = require('mongodb').MongoClient;
// use destructuring instead, using ObjectID constructor function to make new object id on the fly
const {MongoClient, ObjectID} = require('mongodb');

// object destructuring - pull out properties from object
// var user = {name: 'Dan', age: 42};
// var {name} = user;
// console.log(name);

// var obj = new ObjectID();
// console.log(obj);       // unique object ID is created
//
// first argument : URL where database lives or localhost, plus callback function after connection succeeds or fails
// err may or may not exist, db object to read/write

// MongoDB v3
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {     // don't need to create new database to start using it, creation happens when we start adding data
  if (err) {
    return console.log('Unable to connect to MongoDB server');      // by return here, you prevent rest of program from running
  }
  console.log('Connected to MongoDB server');
  const db = client.db('TodoApp');

  // insert new record, argument is collection you want to insert into, collection doesn't have to exist before we start adding to it
  // arguments for insertOne are an object plus callback function after db read/write completes
  // db.collection('Todos').insertOne({
  //   text: 'Do something',
  //   completed: false
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('Unable to insert todo ', err);
  //   }
  //   console.log(JSON.stringify(result.ops, undefined, 2))         // ops argument provides all docs that were inserted
  // });

  // Insert new doc into Users (name, age, location)
//   db.collection('Users').insertOne({
//     name: 'Dan',
//     age: 42,
//     location: 'Chicago'
//   }, (err, result) => {
//     if (err) {
//       return console.log('Unable to insert user ', err);
//     }
//     console.log(JSON.stringify(result.ops, undefined, 2))
//   }); // end db collection insert

// get timestamp of inserted doc
  //console.log(result.ops[0]._id.getTimestamp());
//
   client.close();
 });  // end mongo connect

// MongoDB v2
// MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {     // don't need to create new database to start using it, creation happens when we start adding data
//   if (err) {
//     return console.log('Unable to connect to MongoDB server');      // by return here, you prevent rest of program from running
//   }
//   console.log('Connected to MongoDB server');
//
//   // insert new record, argument is collection you want to insert into, collection doesn't have to exist before we start adding to it
//   // arguments for insertOne are an object plus callback function after db read/write completes
//   db.collection('Todos').insertOne({
//     text: 'Do something',
//     completed: false
//   }, (err, result) => {
//     if (err) {
//       return console.log('Unable to insert todo ', err);
//     }
//     console.log(JSON.stringify(result.ops, undefined, 2))         // ops argument provides all docs that were inserted
//   });

//   db.close();
// });  // end mongo connect
