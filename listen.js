const io = require('socket.io-client');
const socket = io('http://localhost:3000'); // Adjust if using different port

socket.on('connect', () => {
  console.log('✅ Connected to WebSocket server');
});

socket.on('postCreated', (data) => {
  console.log('📢 New post received via WebSocket:', data);
});

socket.on('disconnect', () => {
  console.log('❌ Disconnected from WebSocket server');
});

