const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// delete multiple records
Todo.remove({}).then((result) => {
  console.log(result);
}); // end todo.remove

// will also return removed document
Todo.findOneAndRemove({_id: '5abaf0cd7378de666b6e6eb1'})   // query object
.then((todo) => {
  console.log(todo);
});

// pass in ID as argument, will also return removed document
Todo.findByIdAndRemove('5abaf0cd7378de666b6e6eb1')
.then((todo) => {
  console.log(todo);
});
