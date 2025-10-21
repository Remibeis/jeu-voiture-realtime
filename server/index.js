const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
cors: { origin: '*' }
});


app.use(express.static('../client-desktop'));
app.use('/mobile', express.static('../client-mobile'));

io.on('connection', (socket) => {
console.log('Client connecté :', socket.id);

socket.on('disconnect', () => {
    console.log('Client déconnecté :', socket.id);
});

socket.on('input', (data) => {
    console.log('Input reçu :', data);
    io.emit('state', data); 
});
});

server.listen(3000, () => console.log('Serveur lancé sur http://localhost:3000'));
