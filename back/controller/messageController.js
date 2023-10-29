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

export async function sendMessage(req, res) {
  const {content, convId, userId, author} = req.body;

  try {
    const result = await req.server.pg.query(
      `INSERT INTO "message" ("content", "convId", "userId",  "author", "updatedAt")
       VALUES ($1, $2, $3, $4, now()) RETURNING "id", "content", "convId", "userId", "author", "updatedAt";`, [content, convId, userId, author]
    )

    const io = getSocketIOInstance()
    io.to(convId).emit('newMessage', result.rows[0]);

    res.send({message: result.rows[0]})
  } catch (err) {
    res.send({error: err})
  }
}


function setUniqueFilename (userId , convId, messageId, filename){
  return `${convId}-${userId}-${messageId}-${filename}`;
}

export function getLastMessageId(req, convId) {
  return new Promise((resolve, reject) => {
    const query = 'SELECT id FROM "message" ORDER BY "id" DESC LIMIT 1;' 
    req.server.pg.query(query, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result.rows[0].id);
      }
    });
  });
}

export async function sendImage(req, res) {
  const parts = req.parts();
  let convId = 0;
  let userId = 0;
  let author = '';
  let content = null;
  let fileArray = [];
  for await (const part of parts) {
    if (part.fieldname === 'convId') {
      convId = part.value;
    } else if (part.fieldname === 'userId') {
      userId = part.value;
    } else if (part.fieldname === 'author') {
      author = part.value;
    } else if (part.fieldname === 'content') {
      content = part.value;
    } else if (part.fieldname === 'file') {
      const filename = part.filename;
      fileArray.push(filename);
    }
      const lastMessageId = await getLastMessageId(req);
      pathfile = setUniqueFilename(userId, convId, lastMessageId + 1, filename);
      const filePath = `./uploads/${pathfile}`;

      const writeStream = fs.createWriteStream(filePath);
      for await (const chunk of part.file) {
        writeStream.write(chunk);
      }
      writeStream.end();
      console.log('pathfile', pathfile);
      console.log('content', content);
      if(content !== null && pathfile !== null){
        try {
          const [messageResult, imageResult] = await Promise.all([
            req.server.pg.query(
              `INSERT INTO "message" ("content", "convId", "userId", "author", "updatedAt")
               VALUES ($1, $2, $3, $4, now()) RETURNING "id", "content", "convId", "userId", "author", "updatedAt";`,
              [content, convId, userId, author]
            ),
            req.server.pg.query(
              `INSERT INTO "message" ("link", "convId", "userId", "author", "updatedAt")
               VALUES ($1, $2, $3, $4, now()) RETURNING "id", "content", "convId", "userId", "author", "updatedAt";`,
              [filePath, convId, userId, author]
            ),
          ]);
  
          const io = getSocketIOInstance();
          io.to(convId).emit('newMessage', messageResult.rows[0]);
          io.to(convId).emit('newMessage', imageResult.rows[0]);
  
          res.send({ message: messageResult.rows[0], image: imageResult.rows[0] });
        } catch (err) {
          res.send({ error: err });
        }
      }else{
        try {
          const result = await req.server.pg.query(
            `INSERT INTO "message" ("link", "convId", "userId", "author", "updatedAt")
             VALUES ($1, $2, $3, $4, now()) RETURNING "id", "content", "convId", "userId", "author", "updatedAt";`,
            [filePath, convId, userId, author]
          );
          const io = getSocketIOInstance();
          io.to(convId).emit('newMessage', result.rows[0]);
      
          res.send({ message: result.rows[0] });
        } catch (err) {
          res.send({ error: err });
        }
      }
    }
    // if (content != null && part.fieldname === 'file') {
    //   console.log('ici');
    //   console.log('content', content);
    //   console.log('pathfile', pathfile);
    //   try {
    //     const result = await req.server.pg.query(
    //       `INSERT INTO "message" ("content", "convId", "userId", "author", "updatedAt")
    //        VALUES ($1, $2, $3, $4, now()) RETURNING "id", "content", "convId", "userId", "author", "updatedAt";`,
    //       [content, convId, userId, author]
    //     );
    //     const io = getSocketIOInstance();
    //     io.to(convId).emit('newMessage', result.rows[0]);
    
    //     res.send({ message: result.rows[0] });
    //   } catch (err) {
    //     res.send({ error: err });
    //   }
    // }
  }


// export async function sendImage(req, res) {
//     getLastMessageId(req, 2, (err, lastMessageId) => {
//     if (err) {
//       console.log(err);
//       return res.send(err);
//     } else {
//       const parts = req.parts();
//       // console.log(parts);
//       // for (const part of parts) {
//       //   if (part.filename === 'convId'){
//       //     const convId = part.value;
//       //   }else if (part.fieldname === 'userId') {
//       //     const userId = part.value;
//       //   }else if (part.fieldname === 'author') {
//       //     const author = part.value;
//       //   }else if (part.fieldname === 'file') {
//       //     const filename = part.filename;
//       //     fs.writeFileSync(setUniqueFilename(userId, convId, lastMessageId, messageId, filename));
//       //   }else if(part.fieldname === 'content') {
//       //     const content = part.value;
//       //   }
//       //   try {
//       //     const result = req.server.pg.query(
//       //       `INSERT INTO "message" ("content", "convId", "userId",  "author", "updatedAt")
//       //        VALUES ($1, $2, $3, $4, now()) RETURNING "id", "content", "convId", "userId", "author", "updatedAt";`, [content, convId, userId, author]
//       //     )
      
//       //     const io = getSocketIOInstance()
//       //     io.to(convId).emit('newMessage', result.rows[0]);
      
//       //     res.send({message: result.rows[0]})
//       //   } catch (err) {
//       //     res.send({error: err})
//       //   }
//       // }
//     });

//   //     return lastMessageId;
//   //   }
//   // });
// }

// export async function sendImage(req, res) {
//   const parts = req.parts();

//   for await (const part of parts) {
//     if (part.filename === 'conversationId'){
//       const convId = part.value;
//     }else if (part.fieldname === 'userId') {
//       const userId = part.value;
//     }else if (part.fieldname === 'file') {
//       const filename = part.filename;
//       const fileBuffer = await part.toBuffer();
//     }else if(part.fieldname === 'content') {
//       const content = part.value;
//     }
//   }
//   try {
//     req.server.pg.query(
//       'SELECT * FROM "message";',
//       // 'SELECT "id" FROM "message" where "convId"=2');
//       function onResult(err, result) {
//         if(err){
//           res.send(err);
//         }
//         res.send(result);
//       }
//     );  
//   }catch(err){
//     console.log(err);
//   };
//   const convId = 2;
//   req.server.pg.query(
//     'SELECT "id" FROM "message" WHERE "convId" = $1 ORDER BY "id" DESC LIMIT 1;',
//     [convId],
//     function onResult(err, result) {
//       res.send(result.rows[0].id);
//     }
//   );
  
//   return res;
//   // const lastMessageId = getLastMessageId(2);
  
//   // console.log('convId', lastMessageId);
//   // fs.writeFileSync(setUniqueFilename(userId, convId, messageId, filename), fileBuffer);
// }

// export async function sendImage(req, res) {
//   const parts = req.parts();
//   let convId = 0;
//   let userId = 0;
//   let author = '';
//   let content = null;
//   let fileArray = [];
//   for await (const part of parts) {
//     if (part.fieldname === 'convId') {
//       convId = part.value;
//     } else if (part.fieldname === 'userId') {
//       userId = part.value;
//     } else if (part.fieldname === 'author') {
//       author = part.value;
//     } else if (part.fieldname === 'content') {
//       content = part.value;
//     } else if (part.fieldname === 'file') {
//       const filename = part.filename;
//       fileArray.push(filename);
//     }
//     resolve();
//   }
//     console.log('titi');
//     if (fileArray.length === 0) {
//       console.log('pas de fichier');
//     } else {
//       fileArray.forEach((filename) => {
//         console.log('filename', filename);
//       });
//     }
// }