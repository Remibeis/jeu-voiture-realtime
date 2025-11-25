const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const os = require('os');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  },
  transports: ['websocket', 'polling']
});

// Middleware CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Fichiers statiques (public doit contenir desktop.html & mobile.html)
app.use(express.static('public'));

// Route de test
app.get('/test', (req, res) => {
  const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress;
  res.json({
    message: 'Mobile connection test successful! 📱✅',
    timestamp: new Date().toISOString(),
    clientIP: clientIP,
    userAgent: req.headers['user-agent']
  });
});

// WebSocket / Socket.IO
io.on('connection', (socket) => {
  console.log('Un pilote est connecté ✈️');

  socket.on('control', (data) => {
    socket.broadcast.emit('update', data);
    console.log(`Mouvement avion: ${data.action} - ${data.direction || ''}`);
  });

  socket.on('player-shoot', () => {
    socket.broadcast.emit('shoot-projectile');
    console.log('Tir de projectile déclenché 💥');
  });

  socket.on('disconnect', () => {
    console.log('Un pilote s\'est déconnecté');
  });
});

const PORT = 3000;

// 🔍 Fonction pour récupérer l'IP locale (Wi-Fi / Ethernet)
function getLocalIp() {
  const nets = os.networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === 'IPv4' && !net.internal) {
        return net.address; // ex: 10.59.18.129
      }
    }
  }
  return 'localhost';
}

server.listen(PORT, '0.0.0.0', () => {
  const localIp = getLocalIp();

  console.log(`🚀 Serveur en écoute sur port ${PORT}`);
  console.log(`   💻 PC:       http://localhost:${PORT}/desktop.html`);
  console.log(`   📱 Téléphone: http://${localIp}:${PORT}/mobile.html`);
});



