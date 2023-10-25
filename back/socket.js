import { Server } from 'socket.io';

let io;

export function initializeSocketIO(httpServer) {
  io = new Server(httpServer);

  io.on('connection', (socket) => {
    socket.on('joinGroup', (groupId) => {
      socket.join(groupId);
    });
  });
}

export function getSocketIOInstance() {
  if (!io) {
    throw new Error('Socket.IO is not initialized');
  }
  return io;
}
