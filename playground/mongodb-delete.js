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

  // deleteMany
  // db.collection('Todos').deleteMany({text: 'Eat lunch'})
  // .then((result) => {
  //   console.log(result);
  // }, (err) => {
  //   console.log('Unable to delete records');
  // });

  // deleteOne
  // db.collection('Todos').deleteOne({text: 'Do something'})
  // .then((result) => {
  //   console.log(result);
  // }, (err) => {
  //   console.log('Unable to delete records')
  // });

  //findOneAndDelete - only target first one it sees
  // db.collection('Todos').findOneAndDelete({completed: false})
  // .then((result) => {
  //   console.log(result);
  // }, (err) => {
  //   console.log('Unable to delete records')
  // });

  client.close();
 });  // end mongo connect
