const ScOrderLogModel = require('./ScOrderLogModel')
const { buildScOrderLog } = require('./helper')

const projection = { schemaVersion: 0 }

exports.writeLog = async function ({ scOrderId, message, imgUrl = '' }) {
  const doc = new ScOrderLogModel({ scOrderId, message, imgUrl })
  await doc.save()
  return buildScOrderLog(doc.toObject())
}

exports.getLogListByScOrderId = async function (scOrderId) {
  const objList = await ScOrderLogModel.find({ scOrderId }, projection).lean()
  return objList.map(buildScOrderLog)
}
