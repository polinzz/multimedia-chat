import {getConv, getOneConv} from '../controller/convController.js'

export default async function (server) {
  server.get('/getConv', getConv)
  server.get('/getOneConv', getOneConv)
}
