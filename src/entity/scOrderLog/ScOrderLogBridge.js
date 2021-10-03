const cacheBridge = require('cache-bridge')
const { redisCacheClient } = require('~common/connection/redis')

const ScOrderLogModel = require('./ScOrderLogModel')

const projection = { schemaVersion: 0 }

const { bridge, cache } = cacheBridge({
  cacheClient: redisCacheClient,
  prefix: '15:scorderlog',
  ttl: 30 * 1000,
  cacheUndefined: true,
  ttlForUndefined: 5 * 1000,
  get: async function (scOrderId) {
    const objList = await ScOrderLogModel.find({ scOrderId }, projection).lean()
    return objList
  }
})

exports.getListByScOrderId = function (scOrderId) {
  return bridge.get(scOrderId)
}

exports.delCacheByScOrderId = function (scOrderId) {
  return cache.del(scOrderId)
}
