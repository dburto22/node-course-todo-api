require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
// set environment port variable for use with Heroku
const port = process.env.PORT;

// middleware, bodyparser will take json and convert to object, attaching to req
// return value from bodyParser.json is a function, that's the middleware we need for express
// after making this statement we can now send JSON to express
app.use(bodyParser.json());

// send JSON to server
// arguments: URL, callback function
// 'todos' URL is REST API standard for resource creation
app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save()               // mongoose will add to mongodb
  .then((doc) => {
    res.send(doc);          // send back to user
  }, (e) => {
    res.status(400).send(e);    // pass back error and http status code 400
  }); // end todo.save()
}); // end app.post

app.get('/todos', (req, res) => {
  Todo.find()                   // get all todos
  .then((todos) => {
    // happy path
    // don't send back array, send back object, this allows for future modifications to object array
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  })
});

// GET todos but individual object ID
// URL parameter, we can pass that ID in via URL, and then the callback will fire
app.get('/todos/:id', (req, res) => {
  var id = req.params.id;
  // validate id using isValid
    // no: 404, send back empty body
  if (!ObjectID.isValid(id)) {
    return res.status(404).send('ID not valid');
  }
  // findByID to query the database
    // happy path - if todo, send back, if no todo, send back 404 and empty body
    Todo.findById(id)
      .then((todo) => {
        // error - send back 400, then send back empty body (not error message)
        if (!todo) {
          return res.status(404).send({});
        }
        res.status(200).send({todo});       //passing back object gives more flexibility
      }).catch((e) => {
        res.status(400).send();
      });

  // res.send(req.params);
});

app.delete('/todos/:id', (req, res) => {
  // get the id, not valid return 404
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send('ID not valid');
  }
  // remove todo by id, success (validate doc came back) or error (send 400, empty body)
  Todo.findByIdAndRemove(id)
  .then((todo) => {
    if (!todo) {
      return res.status(404).send({});
    }
    // {todo: todo} is same as {todo}, the todo property of the returned object
    res.status(200).send({todo});
  }).catch((e) => {
    res.status(400).send();
  }); // end findByIdandRemove()

}); // end app.delete

// use patch to update a route
app.patch('/todos/:id', (req, res) => {
  var id = req.params.id;
  // updates are stored in body
  // don't want users to update completedAt
  // if the text or completed property exists in req.body, allow for end user updates
  var body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectID.isValid(id)) {
    return res.status(404).send('ID not valid');
  }

  // check the completed value, and set the completed field
  // if user sets completed to true, we use timestamp for completedAt
  // if user sets completed to false, we need to clear the timestamp
  if (_.isBoolean(body.completed) && body.completed) {
    // set completedAt to timestamp
    body.completedAt = new Date().getTime();      // timestamps move up from 1970 unix epoch
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  // query to update the database
  // similar to findOneAndRemove in mongodb-update.js
  // second argument is setting values on object
  // not using key value pairs, have to use mongodb operators
  // $set operator is set to the 'body' variable
  // this is all coming from mongoose
  // third argument are options to tweak how function works
  // new: true is same as returnOriginal: false in mongodb-update.js
  Todo.findByIdAndUpdate(id, {$set: body}, {new: true})
  .then((todo) => {
    if (!todo){
      return res.status(404).send();
    }
    // happy path, we got a todo back!
    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  })
}); // end app.path

// we will listen on Heroku website
app.listen(port, () => {
  console.log(`App started on port ${port}`);
})
// listen on localhost
// app.listen(3000, () => {
//   console.log('App started on port 3000');
// });

module.exports = {app};       // es6 object syntax
