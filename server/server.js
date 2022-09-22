require('dotenv').config();
const express = require('express');
const axios = require('axios');
const path = require('path');
const compression = require('compression');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(compression());
app.use(express.json());
const db = require('./db.js');
app.use(express.static("dist"));


app.get('/Sites', (req, res) => {
  console.log('pulled')
  db.getData()
  .then(({rows}) => (res.set("Content-Security-Policy", "connect-src 'self'"), res.status(200).json(rows[0].results)))
  .catch(error => (console.log(error), res.status(500).json(error)));
})

app.post('/Sites', (req, res) => {
  console.log(req.body);
  db.AddOrUpdateSite(req.body)
  .then(({rows}) => (res.set("Content-Security-Policy", "connect-src 'self'"), res.status(200).json(rows[0])))
  .catch(error => (console.log(error), res.status(500).json(error)));

})

app.listen(port, () => {
  console.log('app listening on:', port);
})

