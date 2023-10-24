import {getMessage, getOneMessage} from '../controller/messageController.js'

export default async function (server) {
  server.get('/getMessage', getMessage)
  server.get('/getOneMessage', getOneMessage)
}
