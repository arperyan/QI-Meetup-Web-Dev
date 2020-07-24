var express = require("express"),
  app = express(),
  // bodyParser = require('body-parser'),
  path = require("path"),
  QRS = require("./qrs");
// morgan = require('morgan');

try {
  var config = require("./config");
  if (config) {
    for (var c in config) {
      process.env[c] = config[c];
    }
  }
} catch (err) {
  //No configuration file found. Not an issue if deploying on heroku for example
}

process.env.appRoot = __dirname;

app.use(express.static(path.join(__dirname, "public")));
app.use("/js", express.static(__dirname));
app.use("/node_modules", express.static(__dirname + "/node_modules"));

app.get("/ticket", function (req, res) {
  console.log("Getting Ticket");
  console.log(process.env.appRoot);
  QRS.getTicket(function (err, ticket) {
    if (err) {
      res.json(err);
    } else {
      res.json(ticket);
    }
  });
});

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(3001, function () {
  console.log("Server listening on port 3001");
});
