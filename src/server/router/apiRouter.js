const express = require('express')

const apiRouter = express.Router()

const v1 = express.Router()
v1.route('/').get((req, res) => res.status(200).json('party API/V1'))

apiRouter.route('/').get(function (req, res) {
  res.status(200).json('party API')
})
apiRouter.use('/v1', v1)

exports.apiRouter = apiRouter
