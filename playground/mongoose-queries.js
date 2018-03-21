const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// existing object id in mongo
var todoId = '5ab16d699beeef388c0e695f';
// validate ID before running query
if (!ObjectID.isValid(todoId)) {
  console.log('ID not valid');
};

// these find queries will elegantly handle missing queries, rather than throwing errors, just returns empty array or null
Todo.find({
  _id: todoId           // mongoose will take string, convert into object id
}).then((todos) => {
  console.log('Todos', todos);
});

// returns one doc at most, the first matching item. meaning we return a document, not an array
Todo.findOne({
  _id: todoId
}).then((todo) => {
  console.log('Todos', todo);
});

// returns one doc at most, by ID
// the possible error is when object id invalid (ex: improper length)
Todo.findById(todoId)
.then((todo) => {
  if (!todo) {
    return console.log('Id not found');
  }
  console.log('Todo by ID', todo);
}).catch((e) => console.log(e));

User.findById('5aac739478b2021b78c38569')
.then((user) => {
  if (!user) {          // case 1: user not found
    return console.log('Unable to find user');
  }
  console.log(JSON.stringify(user, undefined, 2));
}, (e) => {             // case 3: invalid ID
  console.log('error');
})
