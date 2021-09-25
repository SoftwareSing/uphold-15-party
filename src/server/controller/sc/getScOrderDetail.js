const HttpError = require('~common/error/HttpError')
const { isValidId } = require('~common/checker/id')
const ScOrderRepo = require('~entity/scOrder/ScOrderRepo')
const ScOrderLogRepo = require('~entity/scOrderLog/ScOrderLogRepo')

exports.getScOrderDetail = async function ({ scOrderId }) {
  if (!isValidId(scOrderId)) throw new HttpError(400, 'order id 無效，請確認網址是否正確')

  const order = await ScOrderRepo.getByOrderId(scOrderId)
  if (!order) throw new HttpError(404, '找不到這筆訂單')

  const logList = await ScOrderLogRepo.getLogListByScOrderId(scOrderId)
  logList.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())

  return {
    scOrder: {
      scOrderId: order.scOrderId,
      orderStatus: order.orderStatus,
      scText: order.scText,
      scNote: order.scNote,
      createdAt: order.createdAt
    },
    scOrderLogList: logList.map((log) => ({
      scOrderLogId: log.scOrderLogId,
      scOrderId: log.scOrderId,
      message: log.message,
      imgUrl: log.imgUrl,
      createdAt: log.createdAt
    }))
  }
}
