const ScOrder = require('./ScOrder')
const ScOrderModel = require('./ScOrderModel')
const { buildScOrder } = require('./helper')

const projection = { schemaVersion: 0, updatedAt: 0 }

exports.order = async function ({ scCardId, scText, scNote }) {
  const doc = new ScOrderModel({ scCardId, scText, scNote })
  await doc.save()
  const obj = doc.toObject()
  return buildScOrder(obj)
}

exports.getByOrderId = async function (scOrderId) {
  const obj = await ScOrderModel.findById(scOrderId, projection).lean()
  if (!obj) return undefined
  return buildScOrder(obj)
}

exports.getNewestList = async function () {
  const objList = await ScOrderModel
    .find({}, projection)
    .sort({ createdAt: -1 })
    .limit(100)
    .lean()
  return objList.map(buildScOrder)
}

exports.updateOrder = async function ({ scOrderId, orderStatus, imgUrl }) {
  const update$set = {}
  if (Object.values(ScOrder.ORDER_STATUS).includes(orderStatus)) update$set.orderStatus = orderStatus
  if (imgUrl) update$set.imgUrl = imgUrl

  if (Object.keys(update$set).length < 1) return
  await ScOrderModel.updateOne({ _id: scOrderId }, { $set: update$set })
}
