const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mydatabase');

const userSchema = new mongoose.Schema({
  image: String,
  email: String,
  name: String
});
module.exports =mongoose.model('User', userSchema);