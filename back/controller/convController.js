export function getAllConvByUser(req, res) {

  const query = `
      SELECT c."id", c."name", c."adminId", m."content", m."updatedAt"
      FROM "conversation" AS c
      LEFT JOIN (
          SELECT "content", "convId", "updatedAt"
          FROM "message"
          WHERE ("convId", "updatedAt") IN (
              SELECT "convId", MAX("updatedAt")
              FROM "message"
              GROUP BY "convId"
          )
      ) AS m ON m."convId" = c."id"
      WHERE c."id" IN (SELECT "convId" FROM "conversationUser" WHERE "userId" = $1)
      ORDER BY m."updatedAt" DESC;
  `;
  req.server.pg.query(
    query, [req.params.id], 
    function onResult(err, result) {
      res.send(err || result.rows)
    }
  )
}

export function getOneConv(req, res) {
  res.send({hello: 'getOneConv'});
}

