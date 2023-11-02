import { getSocketIOInstance } from '../socket.js';
import { v4 as uuidv4 } from 'uuid';

export function getMessageByConvId (req, res) {
  const query = `SELECT * FROM "message" WHERE "convId" = $1;`
  req.server.pg.query(
    query, [req.params.convId],
    function onResult(err, result) {
      res.send(err || result.rows)
    }
  )
}

export function getOneMessage (req, res) {
  res.send({hello: 'getOneMessage'});
}

export async function sendMessage(req, res) {
  const { content, convId, userId, author, file } = req.body;
  const uploadedFile = JSON.parse(file.value);
  const uri = uploadedFile.uri;
  console.log(uploadedFile);

  try {
    const result = await req.server.pg.query(
      `INSERT INTO "message" ("content", "convId", "userId", "author", "link", "updatedAt")
       VALUES ($1, $2, $3, $4, $5, now()) RETURNING "id", "content", "convId", "userId", "author", "link", "updatedAt";`,
      [content.value, convId.value, userId.value, author.value, uri]
    );

    const io = getSocketIOInstance();
    io.to(convId).emit('newMessage', result.rows[0]);

    res.send({ message: result.rows[0] });
  } catch (err) {
    res.send({ error: err });
  }
}


