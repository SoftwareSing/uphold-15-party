const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  schemaVersion: {
    type: String,
    default: '001.000.000'
  },
  scOrderId: {
    type: String,
    required: true,
    immutable: true
  },
  message: {
    type: String,
    default: ''
  },
  imgUrl: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true
  }
}, { collection: 'sc_order_log', timestamps: false, versionKey: false })

schema.index({ scOrderId: 1, createdAt: -1 })

const model = mongoose.model('ScOrderLog', schema)
module.exports = model
