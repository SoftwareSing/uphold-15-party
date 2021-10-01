const fs = require('fs')
const express = require('express')

const HttpError = require('~common/error/HttpError')
const { consoleUnexpectedError } = require('~common/error/consoleUnexpectedError')
const { webIndexFilePath } = require('~config/webFilePath')

const WebClientController = require('../controller/webClient/WebClientController')

/**
 * @typedef {import('@types/express').Request} Request
 * @typedef {import('@types/express').Response} Response
 */
/**
 * @callback ReqCallback
 * @param {Request} req
 */

const webClientRouter = express.Router()
const indexFileStr = fs.readFileSync(webIndexFilePath, 'utf8')
const replaceRegex = /<!-- server replace head start -->(?:.|\n)*<!-- server replace head end -->/m

webClientRouter.get('/sc/apply', getPageHandleFunc((req) => {
  return WebClientController.normalPageHead({ title: '免費SC申請' })
}))
webClientRouter.get('/sc/track/:orderId', getPageHandleFunc((req) => {
  return WebClientController.scTrackOrderPageHead({ scOrderId: req.params.orderId })
}))
webClientRouter.get('/sc/track', getPageHandleFunc((req) => {
  return WebClientController.normalPageHead({ title: 'SC訂單列表' })
}))

webClientRouter.get('/you-donate-i-donate', getPageHandleFunc((req) => {
  return WebClientController.normalPageHead({ title: 'SC 1+1', description: '你SC，我就斗內' })
}))

webClientRouter.get('*', getPageHandleFunc((req) => {
  return WebClientController.normalPageHead()
}))

exports.webClientRouter = webClientRouter

/**
 * @param {ReqCallback} getHeadFunc
 */
function getPageHandleFunc (getHeadFunc) {
  return function (req, res) {
    return tryHandle(req, res, getHeadFunc)
  }
}

/**
 * @param {Request} req
 * @param {Response} res
 */
async function tryHandle (req, res, getHeadFunc) {
  try {
    const head = await getHeadFunc(req)
    const indexWithHead = indexFileStr.replace(replaceRegex, head)
    res.setHeader('Cache-Control', 'public, max-age=150')
    return res.status(200).send(indexWithHead)
  } catch (err) {
    if (err instanceof HttpError && err.statusCode === 301) {
      return res.redirect(err.message || '/')
    } else {
      consoleUnexpectedError(err)
      return res.redirect('/')
    }
  }
}
