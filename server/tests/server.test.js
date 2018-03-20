const expect = require('expect');
const request = require('supertest');

// load in local files
// server.js provides access to express app
const {app} = require('./../server');       // require server.js, up one dir from current
const {Todo} = require('./../models/todo');

// testing lifecycle method
// run some code before every test case, in our case we empty the database
beforeEach((done) => {            // we only execute a test case after calling done
  Todo.remove({})                 // wipe all todos
  .then(() => done());            // call done
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
      Todo.find()
      .then((todos) => {                  // todos == array
        expect(todos.length).toBe(1);     // we're always wiping database, so only expect one record
        expect(todos[0].text).toBe(text);
        done();
        // catch errors thrown inside of callback
      }).catch((e) => done(e));
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
        expect(todos.length).toBe(0);
        done();
      }).catch((e) => done(e));
    })
  }) // end it should
}); // end describe post todos
