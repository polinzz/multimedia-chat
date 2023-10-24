
export function getUser (req, res) {
  res.send({hello: 'getUser'});
}

export function getOneUser (req, res) {
  res.send({hello: 'getOneUser'});
}

export function signIn (req, res) {
  const {email,password} = req.body;

  req.server.pg.query(
    'SELECT id, name, pwd,email FROM "user" where email=$1',
    [email.toLowerCase()],
    function onResult(err, result) {
        if(err){
          res.send(err);
          return;
        }

        if (result.rows[0].pwd === password) {
          const token = {
            user: {
              id: result.rows[0].id,
              name: result.rows[0].name,
              email: result.rows[0].email,
            },
          };
          res.send(token);
          return;
        } 
        res.status(401).send({ error: 'Wrong credentials' })
      }
  );
}