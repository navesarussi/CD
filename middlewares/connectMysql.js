const mysql = require('mysql2');
const config = require('config');
const util = require('util');

/**
 * Creates a MySQL connection pool.
 */
const pool = mysql.createPool({
    host: config.get('mysql.host'),
    user: config.get('mysql.user'),
    password: config.get('mysql.password'),
    database: config.get('mysql.database'),
    port: config.get('mysql.port'),
    connectionLimit: 10,
    waitForConnections: true,
    maxIdle: 10,
    idleTimeout: 60000,
    queueLimit: 0,
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

/**
 * Exports the connection pool and middleware.
 */
module.exports = {
    db: pool,
    middleware,
};