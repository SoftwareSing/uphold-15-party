const express = require('express')
const cors = require('cors')
const { ENV, envKeyword } = require('~config/env')

const { apiRouter } = require('./router/apiRouter')

exports.expressApp = function () {
  const app = express()

  let close = false
  app.use((req, res, next) => {
    if (close) res.setHeader('Connection', 'close')
    next()
  })
  app.closeConnection = () => { close = true }

  if (ENV === envKeyword.development) app.use(cors())
  app.use(express.urlencoded({ limit: '10mb', extended: true }))
  app.use(express.json({ limit: '10mb', extended: true }))
  app.use('/api', apiRouter)
  app.use(function (req, res) {
    res.status(404).json({ error: 'unknow path' })
  })
  app.use(errorHandler)

  return app
}

/**
 * @param {Error} err
 */
function errorHandler (err, req, res, next) {
  if (err instanceof SyntaxError) {
    res.status(400).json({ error: 'invalid json' })
    return next()
  } else if (err.message === 'request aborted') {
    res.status(400).json()
    return next()
  }

  let message = `\n!! error at: ${(new Date()).toISOString()}\n`
  message += `req.url: ${req.url}\n`
  console.error(message)
  console.error(err)

  res.status(500).send({ error: 'unknow error' })

  return next()
}
