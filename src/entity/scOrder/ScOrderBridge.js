const cacheBridge = require('cache-bridge')
const { redisCacheClient } = require('~common/connection/redis')

const ScOrderModel = require('./ScOrderModel')

const projection = { schemaVersion: 0, updatedAt: 0 }

const { bridge: orderBridge, cache: orderCache } = cacheBridge({
  cacheClient: redisCacheClient,
  prefix: '15:scorder',
  ttl: 30 * 1000,
  cacheUndefined: true,
  ttlForUndefined: 5 * 1000,
  get: async function (scOrderId) {
    const obj = await ScOrderModel.findOne({ _id: scOrderId }, projection).lean()
    return obj || undefined
  },
  getMany: async function (scOrderIdList) {
    const objList = await ScOrderModel.find(
      { _id: { $in: scOrderIdList } },
      projection
    ).lean()

    const map = new Map()
    for (const obj of objList) {
      const id = String(obj._id)
      map.set(id, obj)
    }
    return map
  }
})

const { bridge: newestIdListBridge, cache: newestIdListCache } = cacheBridge({
  cacheClient: redisCacheClient,
  prefix: '15:scorder:newestid',
  ttl: 30 * 1000,
  cacheUndefined: true,
  ttlForUndefined: 5 * 1000,
  get: async function () {
    const objList = await ScOrderModel
      .find({}, { _id: 1 })
      .sort({ createdAt: -1 })
      .limit(100)
      .lean()
    return objList.map((obj) => String(obj._id))
  }
})

exports.getOrder = function (scOrderId) {
  return orderBridge.get(scOrderId)
}
exports.getOrderMap = function (scOrderIdList) {
  return orderBridge.getMany(scOrderIdList)
}
exports.delOrderCache = function (scOrderId) {
  return orderCache.del(scOrderId)
}

exports.getNewestIdList = function () {
  return newestIdListBridge.get('list')
}
exports.delNewestIdListCache = function () {
  return newestIdListCache.del('list')
}
