import { getSocketIOInstance } from '../socket.js';
import fs from 'fs';

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

export function upload(req, res) {
  try {
    const { file } = req.body;

    if (file) {
      const { filename, _buf } = file;
      const destinationPath = 'uploads/' + filename;

      fs.writeFileSync(destinationPath, _buf);

      res.send({ message: 'Image sauvegardée avec succès !' });
    } else {
      res.status(400).send({ error: 'Aucun fichier trouvé dans la demande.' });
    }
  } catch (err) {
    res.status(500).send({ error: err });
  }
}

export async function sendMessage(req, res) {
  const {content, convId, userId, author, link} = req.body;

  try {
    const result = await req.server.pg.query(
      `INSERT INTO "message" ("content", "convId", "userId",  "author", "link", "updatedAt")
       VALUES ($1, $2, $3, $4, $5, now()) RETURNING "id", "content", "convId", "userId", "author", "link", "updatedAt";`, [content, convId, userId, author, link]
    )

    const io = getSocketIOInstance()
    io.to(convId).emit('newMessage', result.rows[0]);

    res.send({message: result.rows[0]})
  } catch (err) {
    res.send({error: err})
  }
}

