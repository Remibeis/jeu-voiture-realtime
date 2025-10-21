const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Add CORS headers for mobile browsers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(express.static('public'));

// Simple test endpoint for mobile debugging
app.get('/test', (req, res) => {
  const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress;
  res.json({
    message: 'Mobile connection test successful! 📱✅',
    timestamp: new Date().toISOString(),
    clientIP: clientIP,
    userAgent: req.headers['user-agent']
  });
});

io.on('connection', (socket) => {
  console.log('Un pilote est connecté ✈️');

  // Handle plane movement
  socket.on('control', (data) => {
    socket.broadcast.emit('update', data);
    console.log(`Mouvement avion: ${data.action} - ${data.direction || ''}`);
  });

  // Handle shooting
  socket.on('player-shoot', () => {
    socket.broadcast.emit('shoot-projectile');
    console.log('Tir de projectile déclenché 💥');
  });

  socket.on('disconnect', () => {
    console.log('Un pilote s\'est déconnecté');
  });
});

const PORT = 3000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Serveur en écoute sur TOUTES les interfaces:`);
  console.log(`   💻 Local: http://localhost:${PORT}/desktop.html`);
  console.log(`   📱 Mobile: http://10.59.19.183:${PORT}/mobile.html`);
  console.log(`   🌐 Réseau: http://0.0.0.0:${PORT}`);
  
  // Test server accessibility
  const testUrls = [
    `http://localhost:${PORT}/mobile.html`,
    `http://10.59.19.183:${PORT}/mobile.html`
  ];
  
  console.log('\n🔍 Test de connectivité:');
  testUrls.forEach(url => {
    const http = require('http');
    const urlObj = new URL(url);
    const req = http.get({
      hostname: urlObj.hostname,
      port: urlObj.port,
      path: urlObj.pathname,
      timeout: 2000
    }, (res) => {
      console.log(`   ✅ ${url} - Status: ${res.statusCode}`);
    }).on('error', (err) => {
      console.log(`   ❌ ${url} - Error: ${err.message}`);
    });
  });
});
