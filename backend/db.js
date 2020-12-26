const mongoose = require('mongoose');

const uri = process.env.DB_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.info('Database is running');
}).catch(() => {
  console.error('Failed connect to database');
});

module.exports = mongoose.connection;
