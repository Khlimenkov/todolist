const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const taskRouters = require('./routes/taskRouter');

const jsonParser = express.json();

const app = express();
app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());
app.use(jsonParser);

const initPassport = require('./passport/init');

initPassport(passport);
const userRouters = require('./routes/userRouter')(passport);

app.use('/', userRouters);
app.use('/api/tasks', taskRouters);

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
