var mongoose = require('mongoose');

// setup mongoose to use Promises
mongoose.Promise = global.Promise;
//connect to database using mongoose
mongoose.connect('mongodb://localhost:27017/TodoApp');

module.exports = {mongoose}
// module.exports = {
//   mongoose: mongoose
// };
