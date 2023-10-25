export function getMessage (req, res) {
  res.send({hello: 'getMessage'});
}

export function getOneMessage (req, res) {
  res.send({hello: 'getOneMessage'});
}

export function newMessage (req, res) {
	res.send({hello: 'newMessage'});
}