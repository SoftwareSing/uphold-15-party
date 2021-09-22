const ScOrder = require('./ScOrder')

exports.buildScOrder = function (obj) {
  obj.scOrderId = String(obj._id)
  return new ScOrder(obj)
}
