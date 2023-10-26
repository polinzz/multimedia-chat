import { getSocketIOInstance } from '../socket.js';

export function getMessageByConvId (req, res) {
  const query = `SELECT * FROM "message" WHERE "convId" = $1;`
  req.server.pg.query(
    query, [req.params.convId],
    function onResult(err, result) {
      console.log(result.rows[0].updatedAt, typeof result.rows[0].updatedAt)
      res.send(err || result.rows)
    }
  )
}

export function getOneMessage (req, res) {
  res.send({hello: 'getOneMessage'});
}

export async function sendMessage(req, res) {
  const {content, convId, userId} = req.body;
  console.log(req.body)

  try {
    const result = await req.server.pg.query(
      `INSERT INTO "message" ("content", "convId", "userId", "updatedAt")
       VALUES ($1, $2, $3, now()) RETURNING "id", "content", "convId", "userId", "updatedAt";`, [content, convId, userId]
    )

    const io = getSocketIOInstance()
    io.to(convId).emit('newMessage', result.rows[0]);

    res.send({message: result.rows[0]})
  } catch (err) {
    res.send({error: err})
  }
}

