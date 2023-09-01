const mongoose = require('mongoose');
const mongoURI =
  'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false';

const connectToMongo = () => {
  mongoose
    .connect(mongoURI)
    .then(() => {
      console.log('connected to mongoose successfully');
    })
    .catch((error) => console.log(error));
};

module.exports = connectToMongo;
