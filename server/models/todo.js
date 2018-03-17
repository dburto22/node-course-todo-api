var mongoose = require('mongoose');

// create a model for everything we want to store, a Todo model
// two arguments: name and object properties

var Todo = mongoose.model('Todo', {           // this is a Schema
  text: {
    type: String,                 // numbers / booleans when entered get cast as strings
    required: true,                    // this is Validation
    minlength: 1,                  // guard against empty string
    trim: true                    // get rid of whitespace
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  }
});  // end todo model

module.exports = {Todo};

// // create a todo using constructor
// var newTodo = new Todo({
//   text: 'Cook breakfast'              // don't need to add all fields
// });
//
// newTodo.save()                         // save to mogodb, returns a Promise
//  .then((doc) => {
//    console.log('Saved todo', doc);
//  }, (e) => {
//    console.log('Unable to save todo')
//  });

// create a todo using constructor
// var newTodo = new Todo({
//   text: 'Make love',
//   completed: true,
//   completedAt: 2018-03-21               // timestamp from 1970 (negative values moved back from '70')
// });
//
// newTodo.save()                         // save to mogodb, returns a Promise
//  .then((doc) => {
//    console.log('Saved todo', doc);
//  }, (e) => {
//    console.log('Unable to save todo')
//  });
