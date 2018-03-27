var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
// set environment port variable for use with Heroku. or 3000 if we're running locally
const port = process.env.PORT || 3000;

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

// we will listen on Heroku website
app.listen(port, () => {
  console.log(`App started on port ${port}`);
})
// listen on localhost
// app.listen(3000, () => {
//   console.log('App started on port 3000');
// });

module.exports = {app};       // es6 object syntax
