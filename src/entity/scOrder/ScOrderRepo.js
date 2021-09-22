const ScOrderModel = require('./ScOrderModel')
const { buildScOrder } = require('./helper')

exports.order = async function ({ scCardId, scText, scNote }) {
  const doc = new ScOrderModel({ scCardId, scText, scNote })
  await doc.save()
  const obj = doc.toObject()
  return buildScOrder(obj)
}
