import Fastify from 'fastify'
import process from "process";
import userRoute from './routes/user.js';
import convRoute from './routes/conv.js';
import messageRoute from './routes/message.js';
import fastifyPostgres from "@fastify/postgres";
import config from './config.local.json' assert { type: 'json' };

const hostMyIp = config.hostMyIp;
const fastify = Fastify({
  logger: true
})

fastify.register(fastifyPostgres, {
  connectionString: 'postgres://user:password@127.0.0.1:5432/CHAT',
});

fastify.register(userRoute);
fastify.register(convRoute);
fastify.register(messageRoute);

fastify.get('/user/:id', function (req, reply) {
  const query = 'SELECT DISTINCT ON (m."updatedAt") m."updatedAt", m.content, c."name", c."id", c."adminId" FROM "conversation" AS c LEFT JOIN "message" as m ON m."convId" = c."id" WHERE c.id IN(SELECT "convId" FROM "conversationUser" WHERE "userId" = $1) ORDER BY m."updatedAt" DESC';
  fastify.pg.query(
    query, [req.params.id],
    function onResult (err, result) {
      reply.send(err || result)
    }
  )
})

try {
  await fastify.listen({port: 4499, host: hostMyIp})
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}

