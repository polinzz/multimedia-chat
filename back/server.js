import Fastify from 'fastify';
import process from 'process';
import userRoute from './routes/user.js';
import convRoute from './routes/conv.js';
import messageRoute from './routes/message.js';
import fastifyPostgres from '@fastify/postgres';
import cors from '@fastify/cors';
import config from './config.json' assert { type: 'json' };
import http from 'http';
import { initializeSocketIO } from './socket.js';

const hostMyIp = config.hostMyIp;
const fastify = Fastify({
  logger: true,
});

fastify.register(cors, {
  origin: 'http://localhost:19006',
});

fastify.register(fastifyPostgres, {
  connectionString: 'postgres://user:password@127.0.0.1:5432/CHAT',
});

fastify.register(userRoute);
fastify.register(convRoute);
fastify.register(messageRoute);

const serverIo = http.createServer(fastify.server);
initializeSocketIO(serverIo);

try {
  await fastify.listen({ port: 4499, host: hostMyIp });
  await serverIo.listen(4500, hostMyIp, () => {
    console.log('Socket.IO server is running on port 4500');
  });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
