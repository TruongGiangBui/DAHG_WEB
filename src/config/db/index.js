const mongoose = require('mongoose');
async function connect() {
  try {
    await mongoose.connect('mongodb://localhost:27017/films', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected succesfully');
  } catch (error) {
    console.log('Connect failure');
  }
}
module.exports = { connect };
