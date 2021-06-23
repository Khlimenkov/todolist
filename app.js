const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const taskRouters = require('./routes/taskRouter');

const jsonParser = express.json();
require('./config/passport')(passport);

const app = express();
app.use(cookieParser());

app.use(passport.initialize());
app.use(jsonParser);
app.use(express.urlencoded({ extended: true }));

const userRouters = require('./routes/userRouter');

app.use('/', userRouters);
app.use(
  '/api/tasks',
  passport.authenticate('jwt', { session: false }),
  taskRouters,
);

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
