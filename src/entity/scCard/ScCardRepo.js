const ScCard = require('./ScCard')
const ScCardModel = require('./ScCardModel')
const ScCardBridge = require('./ScCardBridge')
const { buildScCard } = require('./helper')

const projection = { schemaVersion: 0, createdAt: 0, updatedAt: 0 }

exports.getByScCardNo = async function (scCardNo) {
  const obj = await ScCardBridge.getByScCardNo(scCardNo)
  if (!obj) return undefined
  return buildScCard(obj)
}

/**
 * @param {Object} scCardData
 * @param {String} scCardData.scCardNo
 * @param {String} [scCardData.goodThru]
 * @param {String} [scCardData.code]
 * @param {String} [scCardData.password]
 */
exports.upsertScCard = async function ({ scCardNo, goodThru, code, password }) {
  const update$set = {}
  if (goodThru) update$set.goodThru = goodThru
  if (code) update$set.code = code
  if (password) update$set.passwordArgon2 = await ScCard.hashPasswordByArgon2(password)

  const obj = await ScCardModel.findOneAndUpdate(
    { scCardNo },
    { $set: update$set },
    { new: true, upsert: true, setDefaultsOnInsert: true, projection: projection }
  ).lean()
  await ScCardBridge.delCacheByScCardNo(scCardNo)

  return buildScCard(obj)
}
