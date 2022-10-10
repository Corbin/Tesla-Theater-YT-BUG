require('dotenv').config();
const { Pool } = require('pg');
const pool = new Pool({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOSTNAME,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
})

const getData = (userID) => pool.query(`
WITH DATA AS (SELECT * FROM items_users WHERE user_id=$1 ORDER BY id)
SELECT json_agg(row_to_json(data)) results FROM data`, [userID]);

const attemptLogin = (loginData) => pool.query(`SELECT attemptLogin($1, $2) AS results`, [loginData.username, loginData.password]);

const attemptRegistration = (registrationData) => pool.query(`
INSERT INTO USERS (username, password, lastLogin) VALUES ($1, $2, current_timestamp) RETURNING *`, [registrationData.username, registrationData.password]);


const AddOrUpdateSite = (userID, data) => {
  const name = data.name;
  const url = data.url;
  const imageURL = data.imageurl;
  const category = data.category;

  return pool.query(`INSERT INTO items_users( user_id, name, url, imageurl, category) VALUES ($1, $2, $3, $4, $5)
  ON CONFLICT (name)
  DO
  UPDATE SET url=$3, imageurl=$4, category=$5
  RETURNING *
  `, [userID, name, url, imageURL, category]);
}


module.exports = {
  getData,
  AddOrUpdateSite,
  attemptLogin,
  attemptRegistration
}
