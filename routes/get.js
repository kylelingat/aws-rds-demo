const Pool =  require('pg-pool');
const config =  require('../../config.json')
const { table, host, database, user, password, port } = config
const pool =  new  Pool({
  host,
  database,
  user,
  password,
  port,
  idleTimeoutMillis: 1000
});




module.exports.get = (event, context, callback) => {

  const getAllStudents = "SELECT * FROM " + table + ";";

  pool.connect()
    .then(client => {
      client.release()
      return client.query(getAllStudents)
    })
    .then(res => {

      const response = {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true
        },
        body: JSON.stringify(res.rows),
      }

      callback(null, response);
    })
    .catch(error => {
      console.log('error', error)

      const response = {
        statusCode: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true
        },
        body: JSON.stringify(error)
      }
      callback(null, response);
    });
};