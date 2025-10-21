const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('Un utilisateur est connecté');

  socket.on('control', (data) => {
    socket.broadcast.emit('update', data);
    console.log(`Mouvement reçu: ${data.action} - ${data.direction || ''}`);
  });

  socket.on('disconnect', () => {
    console.log('Un utilisateur s\'est déconnecté');
  });
});

const PORT = 3000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Serveur en écoute sur http://localhost:${PORT}`);
  console.log('Pour la démo, ouvrez http://localhost:3000/desktop.html sur votre ordinateur');
  console.log('Et http://10.59.19.183:3000/mobile.html sur votre téléphone');
});
