const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Serve static files from the 'public' directory
//app.use(express.static('public'));

// Render the index.ejs view on the root URL
app.get('/', (req, res) => {
  res.render('index');
});

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle chat messages
  socket.on('chat message', (message) => {
    console.log(`Received message: ${message}`);
    io.emit('chat message', message);
  });

  // Handle user disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start the server
const port = 3000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
