const crypto = require('crypto')

const { disconnectRedis } = require('~common/connection/redis')
const Mongodb = require('~common/connection/Mongodb')
const ScCardRepo = require('~entity/scCard/ScCardRepo')

async function run () {
  await Mongodb.connect()
  await upsertTestScCard()
  await Mongodb.disconnect()
  await disconnectRedis()
}

async function upsertTestScCard () {
  await ScCardRepo.upsertScCard({
    scCardNo: '0000111122223333',
    goodThru: '4321',
    code: '789',
    password: crypto.createHash('sha3-256').update('xyzabc').digest('hex')
  })
  await ScCardRepo.upsertScCard({
    scCardNo: '4444555566667777',
    goodThru: '4321',
    code: '789',
    password: crypto.createHash('sha3-256').update('abcxyz').digest('hex')
  })
  await ScCardRepo.upsertScCard({
    scCardNo: '1111333355557777',
    goodThru: '5678',
    code: '246',
    password: crypto.createHash('sha3-256').update('qwerasdf').digest('hex')
  })
}

run()
