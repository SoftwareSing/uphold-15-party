const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  schemaVersion: {
    type: String,
    default: '001.001.000'
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
  }
}, { collection: 'sc_order', timestamps: true, versionKey: false })

schema.index({ scCardId: 1, createdAt: -1 })

const model = mongoose.model('ScOrder', schema)
module.exports = model
