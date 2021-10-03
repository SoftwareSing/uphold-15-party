const ScOrderLogModel = require('./ScOrderLogModel')
const ScOrderLogBridge = require('./ScOrderLogBridge')
const { buildScOrderLog } = require('./helper')

exports.writeLog = async function ({ scOrderId, message, imgUrl = '' }) {
  const doc = new ScOrderLogModel({ scOrderId, message, imgUrl })
  await doc.save()
  await ScOrderLogBridge.delCacheByScOrderId(scOrderId)
  return buildScOrderLog(doc.toObject())
}

exports.getLogListByScOrderId = async function (scOrderId) {
  const objList = await ScOrderLogBridge.getListByScOrderId(scOrderId)
  return objList.map(buildScOrderLog)
}
