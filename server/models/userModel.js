const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const Schema = mongoose.Schema;
// const MONGO_URI = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../secrets.json'))).MONGO_URI;
const MONGO_URI = `mongodb+srv://Nigerian:Nigerian@cluster0.ma90j.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(MONGO_URI, {
  // options for the connect method to parse the URI
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // sets the name of the DB that our collections are part of
  dbName: 'users'
})
  .then(() => console.log('Connected to Mongo DB.'))
  .catch(err => console.log(err));




const UserSchema = new mongoose.Schema({
  nameOfUser: { type: String, required: true, unique: true },
  nameOfBrewery: { type: String, required: true },
  nameOfHotel: { type: String, required: true },

  statusOfBrewery: { type: String, required: true },
  statusOfHotel: { type: String, required: true },
  created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);

// You must export your model through module.exports
// The collection name should be 'student'