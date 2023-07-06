const mysql = require('mysql2');
const config = require('config');
const util = require('util');

/**
 * Creates a MySQL connection pool.
 */
const pool = mysql.createPool({
  host: config.get('mysql.host'), // MySQL host
  user: config.get('mysql.user'), // MySQL username
  password: config.get('mysql.password'), // MySQL password
  database: config.get('mysql.database'), // MySQL database name
  port: config.get('mysql.port'), // MySQL port
  connectionLimit: 10, // Maximum number of connections in the pool
  waitForConnections: true, // Whether to wait for a connection to become available in case the pool is full
  maxIdle: 10, // Maximum number of idle connections in the pool
  idleTimeout: 60000, // Time in milliseconds after which an idle connection is released
  queueLimit: 0, // Maximum number of requests in the queue waiting for a connection
});

/**
 * Promisifies the `query` and `execute` methods of the connection pool.
 */
pool.query = util.promisify(pool.query);
pool.execute = util.promisify(pool.execute);

/**
 * Middleware to attach the connection pool to the request object.
 */
const middleware = (req, res, next) => {
  req.db = pool;
  return next();
};

// Log the MySQL connection details
// console.log('MySQL connection pool created');
// console.log('Host:', config.get('mysql.host'));
// console.log('User:', config.get('mysql.user'));
// console.log('Database:', config.get('mysql.database'));
// console.log('Port:', config.get('mysql.port'));

// Log a success message indicating a successful connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Failed to establish a MySQL connection');
    return;
  }
  console.log('MySQL connection established successfully');
  connection.release();
});

/**
 * Exports the connection pool and middleware.
 */
module.exports = {
  db: pool,
  middleware,
};
