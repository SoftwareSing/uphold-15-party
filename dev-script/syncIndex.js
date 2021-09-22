const Mongodb = require('~common/connection/Mongodb')
const ScCardModel = require('~entity/scCard/ScCardModel')
const ScOrderModel = require('~entity/scOrder/ScOrderModel')

async function run () {
  await Mongodb.connect()
  await syncIndex()
  await Mongodb.disconnect()
}

async function syncIndex () {
  for (const model of [ScCardModel, ScOrderModel]) {
    await model.syncIndexes()
  }
}

run()
