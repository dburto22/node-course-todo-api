const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

// load in local files
// server.js provides access to express app
const {app} = require('./../server');       // require server.js, up one dir from current
const {Todo} = require('./../models/todo');

const todos = [{              // array of objects
  // id normally auto generates, but we want manual so we can test for it
  _id: new ObjectID(),
  text: 'First test todo'
}, {
  _id: new ObjectID(),
  text: 'Second text todo'
}];
// testing lifecycle method to manage database objects
// run some code before every test case, in our case we empty the database
beforeEach((done) => {            // we only execute a test case after calling done
  Todo.remove({})                 // wipe all todos
  .then(() => {
    Todo.insertMany(todos);       // mongoose method, insert todos array created above. by returning we allow to chain callbacks
  }).then(() => done());            // call done
});

describe('POST /todos', () => {
  // verify when we send appropriate data, everything goes as expected
  it('should create a new todo', (done) => {
    // just need a string, any value you like
    var text = 'test todo text';

    request(app)
    .post('/todos')
    .send({text})               // supertest will convert the object to json automatically
    // assertions
    .expect(200)
    .expect((res) => {
      expect(res.body.text).toBe(text);
    })
    // instead of passing done to end(), we pass callback to 1) handle errors
    // 2)
    .end((err, res) => {
      if (err) {
        return done(err);       // use return to stop function execution, nothing below will run
      }
      // only execute if return statement above doesn't
      // to validate database, fetch all todos, make assertion about the returned promise
      Todo.find({text})           // find only todos that match text above, to ensure resulting length is 1
      .then((todos) => {                  // todos == array
        expect(todos.length).toBe(1);     // we're always wiping database, so only expect one record
        expect(todos[0].text).toBe(text);
        done();
        // catch errors thrown inside of callback
      }).catch((e) => done(e));       // call done like this because of async call
    }); // end .end
  }); // end it should
  // verify that todo does not get created when we send bad data
  it('should not create todo with invalid body data', (done) => {
    // post request to app with empty object
    // expect 400 response
    // expect length of todos to be zero
    request(app)
    .post('/todos')
    .send({})         // empty object
    .expect(400)
    .end((err, res) => {
      if (err) {
        return done(err);
      }
      Todo.find()
      .then((todos) => {
        expect(todos.length).toBe(2);     // these objects added above
        done();
      }).catch((e) => done(e));
    })
  }); // end it should
}); // end describe post todos

// test the GET method
describe('GET /todos', () => {
  it('should get all todos', (done) => {
    request(app)
    .get('/todos')
    .expect(200)
    .expect((res) => {
      expect(res.body.todos.length).toBe(2);
    })
    .end(done);             // don't need to pass function to done here because not doing asynchronously
  })
}); // end describe GET /todos

describe('GET /todos/:id', () => {
  it('should return todo doc', (done) => {    // async tests need done specified here
    request(app)
    .get(`/todos/${todos[0]._id.toHexString()}`)  // without toHexString this is object
    // look for http status code
    .expect(200)
    .expect((res) => {
      expect(res.body.todo.text).toBe(todos[0].text);
    })
    .end(done);
  }); // end it should return todo doc

  it('should return 404 if todo not found', (done) => {
    var falseId = new ObjectID().toHexString();

    request(app)
    .get(`/todos/${falseId}`)
    .expect(404)
    .end(done);
  }); // end it should return 404 if return not found

  it('should return 404 for non-object ids', (done) => {
    // pass in bad URL like /todos/123
    request(app)
    .get('/todos/123')
    .expect(404)
    .end(done);
  }); // end it should return 404 for non object ids
}); // end describe get todos :id
