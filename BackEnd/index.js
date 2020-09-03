const express = require('express');
const app = express();
const bodyParser = require('body-parser');
let mongoConnect = require('./dbClient/mongo/connection');
const apiRoute = require('./routes/routes')
const PORT = 8080;

const cookieParser = require('cookie-parser');
// const helmet = require('helmet');

// app.use(helmet())

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    // Pass to next layer of middleware
    next();
});

app.use(cookieParser());

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use('/',apiRoute);

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     next();
//   });





mongoConnect.DbConnect().then((resp) => {
    if (resp) {
      console.log("MongoDB connection established")
      var server = app.listen(PORT, () => {
        const host = server.address().address
        const port = server.address().port
        console.log("App listening at http://%s:%s", host, port);
      })
    }
  }).catch(e => console.log("Error in DB initialisation", e));

  process
  .on('unhandledRejection', (reason, p) => {
    console.error(reason, 'Unhandled Rejection at Promise', p);
  })

process.on('unCaughtException', function (err) {
  console.log(err);
  process.exit(1);
});