// automatically set to production on Heroku, have to manually set locally in package.json
// development is the default
// if we're on production or test the NODE_ENV will be set within package.json
// if we're on local than development will be used
var env = process.env.NODE_ENV || 'development';
// console.log('env *****', env);

// setup different mongo databases
if (env === 'development') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
} else if (env === 'test') {
  process.env.PORT = 3000;
  // test database
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
}
