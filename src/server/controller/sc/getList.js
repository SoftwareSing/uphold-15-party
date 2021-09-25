const ScOrderRepo = require('~entity/scOrder/ScOrderRepo')

exports.getList = async function () {
  const orderList = await ScOrderRepo.getNewestList()
  orderList.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())

  return orderList.map((order) => ({
    scOrderId: order.scOrderId,
    orderStatus: order.orderStatus,
    scText: order.scText,
    scNote: order.scNote,
    imgUrl: order.imgUrl,
    createdAt: order.createdAt
  }))
}
