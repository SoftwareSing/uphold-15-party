const ScOrderLog = require('./ScOrderLog')

exports.buildScOrderLog = function (obj) {
  obj.scOrderLogId = String(obj._id)
  return new ScOrderLog(obj)
}
