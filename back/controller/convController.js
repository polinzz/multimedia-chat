export function getAllConvByUser (req, res) {

  const query = 'SELECT DISTINCT ON (m."updatedAt") m."updatedAt", m.content, c."name", c."id", c."adminId" FROM "conversation" AS c LEFT JOIN "message" as m ON m."convId" = c."id" WHERE c.id IN(SELECT "convId" FROM "conversationUser" WHERE "userId" = $1) ORDER BY m."updatedAt" DESC';
  req.server.pg.query(
    query, [req.params.id],
    function onResult (err, result) {
      res.send(err || result.rows)
    }
  )
}

export function getOneConv (req, res) {
  res.send({hello: 'getOneConv'});
}
