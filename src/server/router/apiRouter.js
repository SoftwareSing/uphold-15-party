const express = require('express')

const { scRouterV1 } = require('./scRouter')

const v1 = express.Router()
v1.route('/').get((req, res) => res.status(200).json('party API/V1'))
v1.use('/sc', scRouterV1)

const apiRouter = express.Router()
apiRouter.route('/').get(function (req, res) {
  res.status(200).json('party API')
})
apiRouter.use('/v1', v1)

exports.apiRouter = apiRouter
