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
