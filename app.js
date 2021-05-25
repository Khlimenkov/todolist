const express = require("express");
const mongoose = require("mongoose");
const bluebird = require("bluebird");
const jsonParser = express.json();
const userRouters = require("./routes/userRouter.js");

const app = express()
app.use("/api/users",jsonParser, userRouters);

const port =3999;
const startServer = ()=> {
  app.listen(port)
  console.log("app started");
}
const connectDb = () => {
  mongoose.Promise = bluebird

  const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true
  }
  mongoose.connect("mongodb+srv://lexamolot:1@todolist.jyzo8.mongodb.net/UserDB?retryWrites=true&w=majority", options)
  return mongoose.connection
}
connectDb()
  .on('error', console.log)
  .on('disconnected', connectDb)
  .once('open', startServer)



