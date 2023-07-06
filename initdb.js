const mysql = require('mysql2');
const config = require('config');
const util = require('util');

(async () => {
  console.log(__dirname);

  // Create a connection to the MySQL database
  const connection = mysql.createConnection({
    host: config.get('mysql.host'),
    user: config.get('mysql.user'),
    port: config.get('mysql.port'),
    password: config.get('mysql.password'),
    database: config.get('mysql.database'),
  });

  // Promisify the connection methods for easier use with async/await
  connection.connect = util.promisify(connection.connect);
  connection.query = util.promisify(connection.query);

  // Connect to the MySQL database
  await connection.connect();
  console.log('Connected to the database');

  // Create the "users" table if it doesn't exist
  await connection.query(`
    CREATE TABLE IF NOT EXISTS users (
      id int auto_increment,
      github_id varchar(255) not null,
      primary key (id)
    )
  `);
  console.log('Created "users" table');

  // Create the "users_symbols" table if it doesn't exist
  await connection.query(`
    CREATE TABLE IF NOT EXISTS users_symbols (
      id int auto_increment,
      user_id int not null,
      symbol varchar(5) not null,
      primary key (id)
    )
  `);
  console.log('Created "users_symbols" table');

  // Close the connection
  connection.end();
  console.log('Connection closed');
})();
