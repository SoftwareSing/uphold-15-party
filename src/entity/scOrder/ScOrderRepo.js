const ScOrder = require('./ScOrder')
const ScOrderModel = require('./ScOrderModel')
const ScOrderBridge = require('./ScOrderBridge')
const { buildScOrder } = require('./helper')

exports.order = async function ({ scCardId, scText, scNote }) {
  const doc = new ScOrderModel({ scCardId, scText, scNote })
  await doc.save()
  await ScOrderBridge.delNewestIdListCache()
  const obj = doc.toObject()
  return buildScOrder(obj)
}

exports.getByOrderId = async function (scOrderId) {
  const obj = await ScOrderBridge.getOrder(scOrderId)
  if (!obj) return undefined
  return buildScOrder(obj)
}

exports.getNewestList = async function () {
  const newestIdList = await ScOrderBridge.getNewestIdList()
  const objMap = await ScOrderBridge.getOrderMap(newestIdList)

  const sortObjList = []
  for (const id of newestIdList) {
    if (!objMap.has(id)) continue
    sortObjList.push(objMap.get(id))
  }

  return sortObjList.map(buildScOrder)
}

exports.updateOrder = async function ({ scOrderId, orderStatus, imgUrl }) {
  const update$set = {}
  if (Object.values(ScOrder.ORDER_STATUS).includes(orderStatus)) update$set.orderStatus = orderStatus
  if (imgUrl) update$set.imgUrl = imgUrl

  if (Object.keys(update$set).length < 1) return
  await ScOrderModel.updateOne({ _id: scOrderId }, { $set: update$set })
  await ScOrderBridge.delOrderCache(scOrderId)
}

exports.isScCardHasNotEndOrder = async function (scCardId) {
  const obj = await ScOrderModel.findOne({
    scCardId,
    orderStatus: { $nin: [ScOrder.ORDER_STATUS.FINISH, ScOrder.ORDER_STATUS.REJECT] }
  }, { _id: 1 }).lean()

  return Boolean(obj)
}
