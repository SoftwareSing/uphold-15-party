const ScCard = require('./ScCard')

exports.buildScCard = function (obj) {
  obj.scCardId = String(obj._id)
  return new ScCard(obj)
}
