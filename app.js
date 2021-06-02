const express = require('express');
const mongoose = require('mongoose');

const jsonParser = express.json();
const userRouters = require('./routes/userRouter.js');
require('dotenv').config();

const app = express();
app.use('/api/users', jsonParser, userRouters);

const port = process.env.PORT || 3000;
const startServer = () => {
  app.listen(port);
  console.log('app started');
};
const connectDb = () => {
  const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  };
  mongoose.connect(process.env.DBCONNECT, options);
  return mongoose.connection;
};
connectDb()
  .on('error', console.log)
  .on('disconnected', connectDb)
  .once('open', startServer);
