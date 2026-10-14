const express = require('express');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
const socketio = require('socket.io');
const authRoutes = require('./routes/auth');
const ambulanceRoutes = require('./routes/ambulance');
const emergencyRoutes = require('./routes/emergency');
const { verifyTokenSocket } = require('./utils/authMiddleware');

require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketio(server, { cors: { origin: '*' } });

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/ambulance', ambulanceRoutes);
app.use('/api/emergency', emergencyRoutes);

// Socket.IO for real-time location updates
io.use((socket, next) => {
  // Optional: authenticate socket using token
  next();
});

io.on('connection', (socket) => {
  console.log('Socket connected:', socket.id);

  socket.on('driverLocationUpdate', (data) => {
    // broadcast location to admins and specific rooms (e.g., requestId)
    io.emit('driverLocationUpdate', data);
  });

  socket.on('joinRequestRoom', (requestId) => {
    socket.join('request_' + requestId);
  });

  socket.on('disconnect', () => {
    console.log('Socket disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
const MONGO = process.env.MONGO_URI || 'mongodb://localhost:27017/ambulance_tracker';

mongoose.connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
    server.listen(PORT, () => console.log('Server listening on port', PORT));
  })
  .catch((err) => console.error(err));
