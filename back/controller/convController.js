export function getAllConvByUser (req, res) {

  const query = 'SELECT DISTINCT ON (m."convId") m."convId", m.content, c."name", c."id", c."adminId", m."updatedAt" FROM "conversation" AS c LEFT JOIN "message" as m ON m."convId" = c."id" LEFT JOIN "message" as m2 ON m."convId" = m2."convId" AND m."updatedAt" >= m2."updatedAt" AND m."id" <> m2."id" WHERE c.id IN(SELECT "convId" FROM "conversationUser" WHERE "userId" = $1) ORDER BY m."convId" DESC;';
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
