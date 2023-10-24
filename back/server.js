import Fastify from 'fastify'
import process from "process";
import userRoute from './routes/user.js';
import convRoute from './routes/conv.js';
import messageRoute from './routes/message.js';
const fastify = Fastify({
  logger: true
})

/*fastify.register(require('@fastify/postgres'), {
  connectionString: 'postgres://postgres@localhost/postgres'
})*/

fastify.register(userRoute);
fastify.register(convRoute);
fastify.register(messageRoute);

/*fastify.get('/user/:id', function (req, reply) {
  fastify.pg.query(
    'SELECT id, username, hash, salt FROM users WHERE id=$1', [req.params.id],
    function onResult (err, result) {
      reply.send(err || result)
    }
  )
})*/

try {
  await fastify.listen({ port: 4499 })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}

