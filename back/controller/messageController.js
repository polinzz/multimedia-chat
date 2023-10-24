export function getMessage (req, res) {
  res.send({hello: 'getMessage'});
}

export function getOneMessage (req, res) {
  res.send({hello: 'getOneMessage'});
}
