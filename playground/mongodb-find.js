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

  // collection name as string in first argument
  // db.collection('Todos').find().toArray()           // no arguments = give us every doc from collection, find only returns a pointer, toArray returns a promise
  //   .then((docs) => {
  //     console.log('Todos:');
  //     console.log(JSON.stringify(docs, undefined, 2));
  //   }, (err) => {
  //     console.log('Unable to fetch todos ', err);
  //   });

  // db.collection('Todos').find({completed: false}).toArray()           // find completed todos
  //   .then((docs) => {
  //     console.log('Todos:');
  //     console.log(JSON.stringify(docs, undefined, 2));
  //   }, (err) => {
  //     console.log('Unable to fetch todos ', err);
  //   });

  // db.collection('Todos').find({
  //   _id: new ObjectID('5aac20423ca03fc74a14bf5e')                // find by object id
  // }).toArray()
  //   .then((docs) => {
  //     console.log('Todos:');
  //     console.log(JSON.stringify(docs, undefined, 2));
  //   }, (err) => {
  //     console.log('Unable to fetch todos ', err);
  //   });

  // db.collection('Todos').find().count()           // find and count, with count returning a promise as well
  //   .then((count) => {
  //     console.log(`Todos count: ${count}`);
  //   }, (err) => {
  //     console.log('Unable to count todos ', err);
  //   });

  // query Users collection for user names
  db.collection('Users').find({name: 'Shavon'}).toArray()
    .then((docs) => {
      console.log('Users: ');
      console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
      console.log('Unable to search for users');
    });


  client.close();
 });  // end mongo connect
