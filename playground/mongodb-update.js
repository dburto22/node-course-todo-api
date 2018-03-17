// const MongoClient = require('mongodb').MongoClient;
// use destructuring instead, using ObjectID constructor function to make new object id on the fly
const {MongoClient, ObjectID} = require('mongodb');

// MongoDB v3
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {     // don't need to create new database to start using it, creation happens when we start adding data
  if (err) {
    return console.log('Unable to connect to MongoDB server');      // by return here, you prevent rest of program from running
  }
  console.log('Connected to MongoDB server');
  const db = client.db('TodoApp');

// mongodb.github.io, search 'Collection' for fineOneAndUpdate
// arguments: filter(doc we're working on), update we want to make (google: mongodb update operators), various options, provide callback or allow findOneAndUpdate to return a Promise
  // db.collection('Users').findOneAndUpdate({
  //   _id: new ObjectID('5aac25723ca03fc74a14c043')
  // }, {
  //   $set: {                         // set equal to object
  //     age: 19
  //   }
  // }, {                            // set equal to object
  //   returnOriginal: false         // we want new object, not the original
  // })
  //   .then((result) => {
  //     console.log(result);
  //   }, (err) => {
  //     console.log('Could not update: ', err);
  //   });

  // db.collection('Users').findOneAndUpdate({
  //   _id: new ObjectID('5aac25233ca03fc74a14c02a')
  // }, {
  //   $set: {                         // set equal to object
  //     name: 'Jennifer'
  //   },
  //   $inc: {
  //     age: -1                      // increment age by 1
  //   }
  // }, {                            // set equal to object
  //   returnOriginal: false         // we want new object, not the original
  // })
  //   .then((result) => {
  //     console.log(result);
  //   }, (err) => {
  //     console.log('Could not update: ', err);
  //   });

  client.close();
 });  // end mongo connect
