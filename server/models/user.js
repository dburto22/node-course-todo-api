var mongoose = require('mongoose');

// new User model
// properties: email - required - trimmed - String - min length of 1
var User = mongoose.model('User', {
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  }
});

module.exports = {User};

// var newUser = new User({
//   email: 'dburto22@yahoo.com'
// }); // end new User

// newUser.save()
// .then((doc) => {
//    console.log('Saved user', doc);
//  }, (e) => {
//    console.log('Unable to save user')
//  });
