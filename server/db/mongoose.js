var mongoose = require('mongoose');

// setup mongoose to use Promises
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp');
//connect to local database using mongoose
// mongoose.connect('mongodb://localhost:27017/TodoApp');

module.exports = {mongoose}
// module.exports = {
//   mongoose: mongoose
// };
