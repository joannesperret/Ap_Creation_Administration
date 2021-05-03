const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'mysql-joannesperret.alwaysdata.net',
  user: '212504',
  password: 'P1l0t@ge',
  database: 'joannesperret_api',
});

const query = async (sql, params, res) => {
  try {
    const cn = await db;
    const response = await cn.query(sql, params);
    const data = response[0];
    res.status(200).json(data);
  } catch (err) {
    res.status(500, { error: err });
  }
};

module.exports = {
  query,
  db,
};
