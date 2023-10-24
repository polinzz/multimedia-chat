import {getUser, getOneUser, signIn} from '../controller/userController.js'

export default async function (server) {
  server.get('/getUser', getUser)
  server.get('/getOneUser', getOneUser)
  server.post('/login', signIn)
}
