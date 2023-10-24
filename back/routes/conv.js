import {getAllConvByUser, getOneConv} from '../controller/convController.js'

export default async function (server) {
  server.get('/get-all-conv-by-user/:id', getAllConvByUser)
  server.get('/getOneConv', getOneConv)
}
