const express = require('express');

const { PORT, PREFIX, STORAGE_BUCKET } = process.env;
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const fileUpload = require('express-fileupload');
const firebase = require('firebase-admin');
const cors = require('cors');
const serviceAccount = require('./config/serviceAccountFirebase.json');

require('./db');
require('express-async-errors');

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  storageBucket: STORAGE_BUCKET,
});

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

app.use(cors());

app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({
    error: err.message,
  });
  next(err);
});

app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/',
}));

app.use(`${PREFIX}/user`, require('./routes/user'));
app.use(`${PREFIX}/product`, require('./routes/product'));

app.listen(PORT, () => {
  console.info(`Server started at port: ${PORT}`);
});
