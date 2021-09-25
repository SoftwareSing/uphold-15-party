const Mongodb = require('~common/connection/Mongodb')
const ScCardModel = require('~entity/scCard/ScCardModel')
const ScOrderModel = require('~entity/scOrder/ScOrderModel')
const ScOrderLogModel = require('~entity/scOrderLog/ScOrderLogModel')

async function run () {
  await Mongodb.connect()
  await syncIndex()
  await Mongodb.disconnect()
}

async function syncIndex () {
  for (const model of [ScCardModel, ScOrderModel, ScOrderLogModel]) {
    await model.syncIndexes()
  }
}

run()
