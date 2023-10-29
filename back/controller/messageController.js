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
  console.log(req.file());
  /*const { content, convId, userId, author } = req.body;*/

  try {
    /*let imageFileName = null;

    if (req.file) {
      imageFileName = `${uuidv4()}${req.file.originalname.slice(req.file.originalname.lastIndexOf('.'))}`;

      const destination = `../uploads/${imageFileName}`;
      await req.file.mv(destination);
    }

    const result = await req.server.pg.query(
      `INSERT INTO "message" ("content", "convId", "userId", "author", "link", "updatedAt")
       VALUES ($1, $2, $3, $4, $5, now()) RETURNING "id", "content", "convId", "userId", "author", "link", "updatedAt";`,
      [content, convId, userId, author, imageFileName]
    );

    const io = getSocketIOInstance();
    io.to(convId).emit('newMessage', result.rows[0]);

    res.send({ message: result.rows[0] });*/
  res.send({heelo: 'there'});
  } catch (err) {
    res.send({ error: err });
  }
}


