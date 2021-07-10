const mongoose = require("mongoose");
const express = require("express");
const app = express();
let count = 0;

const options = {
  autoIndex: app.get("env") != "production", // Don't build indexes
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0,
  // all other approaches are now deprecated by MongoDB:
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const connectWithRetry = () => {
  console.log("MongoDB connection with retry");
  const connstring = process.env.CONN_STRING;
  console.log(connstring);
  // connection string example: "user:123456@cluster0.8fpoz.mongodb.net/iedb-dev"
  // Windows: set CONN_STRING=user:123456@cluster0.8fpoz.mongodb.net/iedb-dev
  // Linux: export CONN_STRING=user:123456@cluster0.8fpoz.mongodb.net/iedb-dev
  mongoose
    .connect(`mongodb+srv://${connstring}?retryWrites=true&w=majority`, options)
    .then(() => {
      console.log("MongoDB is connected");
    })
    .catch((err) => {
      console.log(
        "MongoDB connection unsuccessful, retry after 5 seconds. ",
        ++count
      );
      setTimeout(connectWithRetry, 5000);
    });

  /*mongoose.connect("mongodb://localhost:27017/rest-tutorial", options).then(()=>{
        console.log('MongoDB is connected')
    }).catch(err=>{
        console.log('MongoDB connection unsuccessful, retry after 5 seconds. ', ++count);
        setTimeout(connectWithRetry, 5000)
    })*/
};

connectWithRetry();

exports.mongoose = mongoose;
