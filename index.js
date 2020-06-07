const mongoose = require("mongoose");
const cors = require('cors');
const path = require('path');
const express = require("express");
const app = express();
const config = require('./Config/config.json');

// Routes
const auth = require("./Routes/auth");
const users = require("./Routes/users");
const news = require("./Routes/news");
const sources = require("./Routes/sources");
const subscriptions = require("./Routes/subscriptions");

// Connect DataBase
mongoose
  .connect(config.dbUri, {useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.log("Could not connect to MongoDB..."));

// Set Routes
app.use(express.json());
app.use(cors());
app.use("/api/auth", auth);
app.use("/api/users", users);
app.use("/api/news", news);
app.use("/api/sources", sources);
app.use("/api/subscribe", subscriptions);

// Serve static assets if in production
if(process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'Client', 'build', 'index.html'))
  })
}

// Set Port
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});

module.exports = server;