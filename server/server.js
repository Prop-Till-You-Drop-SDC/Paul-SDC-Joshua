const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db/index.js');
const cors = require('cors');
const PORT = 3003;
require('newrelic');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', cors(), express.static(__dirname + '/../client/public'));
app.use('/bundle', cors(), express.static(__dirname + '/../client/public/bundle.js'));

app.get('/places/:location', cors(), (req, res) => {
  let searchLoc = req.params.location;
  db.loadPlaces(searchLoc)
    .then((allPlaces) => {
      res.send(allPlaces);
    })
    .catch((err) => {
      console.log(err);
    })
});

app.get('/todos/:location', cors(), (req, res) => {
  let searchLoc = req.params.location;
  db.loadTodos(searchLoc)
    .then((allTodos) => {
      res.send(allTodos)
    })
    .catch((err) => {
      console.log(err);
    })
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
