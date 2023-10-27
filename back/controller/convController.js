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

export async function createConv(req, res) {
  const { adminId, selectedUsers, conversationName } = req.body;
  selectedUsers.push(adminId);
  try {
    const conversationResult = await req.server.pg.query(
      'INSERT INTO conversation (name, "adminId","updatedAt") VALUES ($1, $2,now()) RETURNING id',
      [conversationName, adminId]
    );
    const conversationId = conversationResult.rows[0].id;
    for (const userId of selectedUsers) {
      await req.server.pg.query('INSERT INTO "conversationUser" ("userId", "convId") VALUES ($1, $2)', [userId, conversationId]);
    }
    res.send({convId: conversationId});
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Internal Server Error' });
  }
}