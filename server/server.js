var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

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

app.listen(3000, () => {
  console.log('App started on port 3000');
});
