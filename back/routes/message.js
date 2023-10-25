import {getMessage, getOneMessage, sendMessage} from '../controller/messageController.js'

export default async function (server) {
  server.get('/getMessage', getMessage)
  server.get('/getOneMessage', getOneMessage)
  server.post('/sendMessage', sendMessage)
}
