const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db/index.js');
const cors = require('cors');

const app = express();

app.use('/', cors(), express.static(__dirname + '/../client/public'));
app.use('/bundle', cors(), express.static(__dirname + '/../client/public/bundle.js'));

// app.get('/api/places', cors(), (req, res) => {
//   db.query(`SELECT * FROM places LIMIT 12`, (err, result) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.send(result);
//     }
//   })
// });

// app.get('/api/things', cors(), (req, res) => {
//   db.query(`SELECT * FROM things LIMIT 20`, (err, result) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.send(result);
//     }
//   })
// });

// app.get('/api/demop', cors(), (req, res) => {
//   db.query(`SELECT * FROM dplaces LIMIT 12`, (err, result) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.send(result);
//     }
//   })
// });

// app.get('/api/demot', cors(), (req, res) => {
//   db.query(`SELECT * FROM dthings LIMIT 20`, (err, result) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.send(result);
//     }
//   })
// });

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
