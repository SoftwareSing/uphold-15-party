const express = require('express')

const ScController = require('../controller/sc/ScController')
const { getReqHandleFunc } = require('./getReqHandleFunc')

const scRouterV1 = express.Router()

scRouterV1.route('/order/:scOrderId')
  .get(getReqHandleFunc(
    (req) => ScController.getScOrderDetail({ scOrderId: req.params.scOrderId })
  ))

scRouterV1.route('/order')
  .post(getReqHandleFunc(
    (req) => ScController.orderSc({ ...req.body })
  ))

module.exports = {
  scRouterV1
}
