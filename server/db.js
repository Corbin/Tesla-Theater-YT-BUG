require('dotenv').config();
const { Pool } = require('pg');
const pool = new Pool({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOSTNAME,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
})

const getData = () => pool.query(`
WITH DATA AS (SELECT * FROM Items ORDER BY id)
SELECT json_agg(row_to_json(data)) results FROM data`);


const AddOrUpdateSite = (data) => {
  const name = data.name;
  const url = data.url;
  const imageURL = data.imageurl;
  const category = data.category;
  return pool.query(`INSERT INTO items( name, url, imageurl, category) VALUES ($1, $2, $3, $4)
  ON CONFLICT (name)
  DO
  UPDATE SET url=$2, imageurl=$3, category=$4
  RETURNING *
  `, [name, url, imageURL, category]);
}


module.exports = {
  getData,
  AddOrUpdateSite
}
