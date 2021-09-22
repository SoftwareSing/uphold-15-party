const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  schemaVersion: {
    type: String,
    default: '001.000.000'
  },
  scCardNo: {
    type: String,
    required: true
  },
  goodThru: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  passwordArgon2: {
    type: String,
    default: ''
  }
}, { collection: 'sc_card', timestamps: true, versionKey: false })

schema.index({ scCardNo: 1 }, { unique: true })

const model = mongoose.model('ScCard', schema)
module.exports = model
