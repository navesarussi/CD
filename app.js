const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const port = 3000;

const session = require("express-session");
const config = require("config");

const users = require("./routes/users");
const guests = require("./routes/guests");
const github = require("./routes/github");
const auth = require("./middlewares/auth");
const { middleware: db } = require("./middlewares/connectMysql");
const mongo = require("./middlewares/connectMongo");
const MySQLStore = require("express-mysql-session")(session);

const mysqlOptions = {
  host: config.get("mysql.host"),
  port: config.get("mysql.port"),
  user: config.get("mysql.user"),
  password: config.get("mysql.password"),
  database: config.get("mysql.database"),
};
const sessionStore = new MySQLStore(mysqlOptions);

console.log("app name :", config.get("app.host"));

// Set the view engine to EJS
app.set("view engine", "ejs");
//Specify the views directory
app.set("views", __dirname + "/views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    store: sessionStore,
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 365 * 5,
    },
  })
);

app.use(auth.initialize());
app.use(auth.session());

app.use(db);
app.use(mongo);

app.use("/auth/github", github);
app.use("/", users);
app.use("/", guests);

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('a user connected');
  
  socket.on('disconnect', () => {
    console.log('a user disconnected');
  });

  socket.on('message from worker', (message) => {
      console.log('io: message from worker', message);
      io.emit('update from express', message);
  })
});

// Start the server
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
