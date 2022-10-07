require('dotenv').config();
const express = require('express');
const axios = require('axios');
const path = require('path');
const compression = require('compression');
const cors = require('cors');
const db = require('./db.js');
const app = express();
const md5 = require('md5');
const port = process.env.PORT || 3000;
app.use(cors());
app.use(compression());
app.use(express.json());

app.use(express.static("dist"));


app.get('/Sites/:user_id', (req, res) => {
  db.getData(req.params.user_id)
  .then(({rows}) => (res.set("Content-Security-Policy", "connect-src 'self'"), res.status(200).json(rows[0].results)))
  .catch(error => (console.log(error), res.status(500).json(error)));
})

app.post('/Sites', (req, res) => {
  db.AddOrUpdateSite(req.body)
  .then(({rows}) => (res.set("Content-Security-Policy", "connect-src 'self'"), res.status(200).json(rows[0])))
  .catch(error => (console.log(error), res.status(500).json(error)));

})

app.get('/Users', (req, res) => {
  //console.log('Login Attempt', req.query)
  db.attemptLogin(req.query)
  .then(({rows}) => (res.set("Content-Security-Policy", "connect-src 'self'"), res.status(200).json(rows[0].results)))
  .catch(error => (console.log(error), res.status(500).json(error)));
})

app.post('/Users', (req, res) => {
  db.attemptRegistration(req.body)
  .then(({rows}) => (res.set("Content-Security-Policy", "connect-src 'self'"), res.status(200).json({
    registrationSuccessful: true,
    id:rows[0]['id'],
    username:rows[0]['username']
  })))
  .catch(error => (console.log(error), res.status(500).json(error.detail.includes('already exists') ? {registrationSuccessful: false, err: "Username already exists"} : {registrationSuccessful: false, err: error})));
})

app.listen(port, () => {
  console.log('app listening on:', port);
})
