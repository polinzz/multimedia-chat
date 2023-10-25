import { getSocketIOInstance } from '../socket.js';

export function getMessage (req, res) {
  res.send({hello: 'getMessage'});
}

export function getOneMessage (req, res) {
  res.send({hello: 'getOneMessage'});
}

export async function sendMessage(req, res) {
  const {content, convId, userId} = req.body;

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

