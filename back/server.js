import Fastify from 'fastify'
import process from "process";
import userRoute from './routes/user.js';
import convRoute from './routes/conv.js';
import messageRoute from './routes/message.js';
import fastifyPostgres from "@fastify/postgres";
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
  fastify.pg.query(
    'SELECT id, name FROM "user" WHERE id=$1', [req.params.id],
    function onResult (err, result) {
      reply.send(result)
    }
  )
})

try {
  await fastify.listen({ port: 4499 })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}

