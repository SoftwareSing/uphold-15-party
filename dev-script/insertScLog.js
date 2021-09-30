const { disconnectRedis } = require('~common/connection/redis')
const Mongodb = require('~common/connection/Mongodb')
const ScOrder = require('~entity/scOrder/ScOrder')
const ScOrderRepo = require('~entity/scOrder/ScOrderRepo')
const ScOrderLogRepo = require('~entity/scOrderLog/ScOrderLogRepo')

async function run () {
  await Mongodb.connect()
  await insertScLog()
  await Mongodb.disconnect()
  await disconnectRedis()
}

async function insertScLog () {
  // await insertLog({
  //   scOrderId: '6150f9667bbd2cf4c6d17035',
  //   message: '已確認申請，準備投遞中',
  //   orderStatus: ScOrder.ORDER_STATUS.PROCESSING
  // })
  await insertLog({
    scOrderId: '6150f9667bbd2cf4c6d17035',
    message: 'SC已送出',
    orderStatus: ScOrder.ORDER_STATUS.FINISH,
    imgUrl: 'https://i.imgur.com/80PkHXr.png'
  })
}

async function insertLog ({ scOrderId, message, orderStatus, imgUrl }) {
  if (message) await ScOrderLogRepo.writeLog({ scOrderId, message, imgUrl })
  if (orderStatus || imgUrl) await ScOrderRepo.updateOrder({ scOrderId, orderStatus, imgUrl })
}

run()
