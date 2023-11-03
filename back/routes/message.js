import {getMessageByConvId, getOneMessage, sendMessage, upload} from '../controller/messageController.js'

export default async function (server) {
  server.get('/get-message-by-conv-id/:convId', getMessageByConvId)
  server.get('/getOneMessage', getOneMessage)
  server.post('/send-message', sendMessage)
  server.post('/upload', upload)
}
