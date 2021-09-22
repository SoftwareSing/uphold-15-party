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
    // 04ac8358eacbd447ff99ac1b893f39d6518143e131ab1a33ea66e01a0905f0e8
  })
  await ScCardRepo.upsertScCard({
    scCardNo: '4444555566667777',
    goodThru: '4321',
    code: '789',
    password: crypto.createHash('sha3-256').update('abcxyz').digest('hex')
    // b90674a7b7d345236d7d500905d8e8075ab15d5f4b4fd8fb3e0e7e42ec52133e
  })
  await ScCardRepo.upsertScCard({
    scCardNo: '1111333355557777',
    goodThru: '5678',
    code: '246',
    password: crypto.createHash('sha3-256').update('qwerasdf').digest('hex')
    // a7a30ebd1806386903f253af20b4132891c446f202249039f874ab12c24ce69a
  })
}

run()
