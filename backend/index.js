const express = require('express');
const port = process.env.PORT;
const prefix = process.env.PREFIX;
const db = require('./db');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
// require('express-async-errors');

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
// app.use((err, req, res) => {
//   console.log(err)
//   const status = err.status || 500;
//   res.status(status).json({
//     error: err.message,
//   });
// });

app.use(`${prefix}/user`, require('./routes/user'));

app.listen(port, () => {
    console.info(`Server started at port: ${port}`);
});