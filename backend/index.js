const express = require('express');
const port = process.env.PORT;
const prefix = process.env.PREFIX;
const db = require('./db');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
require('express-async-errors');

const app = express();
dotenv.config();

app.use(bodyParser.urlencoded({
  extended: true,
  limit: '50mb',
}));
app.use(bodyParser.json({
  extended: true,
  limit: '50mb',
}));

app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({
    error: err.message,
  });
 next(err)
});


//// ROUTERS ////
app.use(`${prefix}/user`, require('./routes/user'));
app.use(`${prefix}/product`, require('./routes/product'));


app.listen(port, () => {
    console.info(`Server started at port: ${port}`);
});