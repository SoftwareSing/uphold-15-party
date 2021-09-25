module.exports = class ScOrderLog {
  /**
   * @param {Object} obj
   * @param {String} obj.scOrderLogId
   * @param {String} obj.scOrderId
   * @param {String} obj.message
   * @param {String} obj.imgUrl
   * @param {Date | Number | String} obj.createdAt
   */
  constructor ({ scOrderLogId, scOrderId, message, imgUrl, createdAt }) {
    this.scOrderLogId = scOrderLogId
    this.scOrderId = scOrderId
    this.message = message
    this.imgUrl = imgUrl
    this.createdAt = new Date(createdAt)
  }
}
