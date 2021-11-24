const mongoose = require('mongoose')
const ScOrder = require('./ScOrder')

const schema = new mongoose.Schema({
  schemaVersion: {
    type: String,
    default: '001.000.000'
  },
  orderStatus: {
    type: String,
    enum: Object.values(ScOrder.ORDER_STATUS),
    default: ScOrder.ORDER_STATUS.APPLIED
  },
  scCardId: {
    type: String,
    default: ''
  },
  scText: {
    type: String,
    default: ''
  },
  scNote: {
    type: String,
    default: ''
  },
  imgUrl: {
    type: String,
    default: ''
  }
}, { collection: 'sc_order', timestamps: true, versionKey: false })

schema.index({ scCardId: 1, createdAt: -1 })
schema.index({ createdAt: -1 })
schema.index({ scCardId: 1, orderStatus: 1, createdAt: -1 })

const model = mongoose.model('ScOrder', schema)
module.exports = model
