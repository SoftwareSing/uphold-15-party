const cacheBridge = require('cache-bridge')
const { redisCacheClient } = require('~common/connection/redis')

const ScCardModel = require('./ScCardModel')

const projection = { schemaVersion: 0, createdAt: 0, updatedAt: 0 }

const { bridge, cache } = cacheBridge({
  cacheClient: redisCacheClient,
  prefix: '15:sccard',
  ttl: 30 * 1000,
  cacheUndefined: true,
  ttlForUndefined: 5 * 1000,
  get: async function (scCardNo) {
    const obj = await ScCardModel.findOne({ scCardNo }, projection).lean()
    return obj || undefined
  }
})

exports.getByScCardNo = function (scCardNo) {
  return bridge.get(scCardNo)
}

exports.delCacheByScCardNo = function (scCardNo) {
  return cache.del(scCardNo)
}
