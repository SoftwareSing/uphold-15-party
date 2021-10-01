const ORDER_STATUS = Object.freeze({
  APPLIED: 'applied',
  PROCESSING: 'processing',
  FINISH: 'finish',
  REJECT: 'reject'
})

class ScOrder {
  /**
   * @param {Object} obj
   * @param {String} obj.scOrderId
   * @param {String} obj.orderStatus
   * @param {String} obj.scCardId
   * @param {String} obj.scText
   * @param {String} obj.scNote
   * @param {String} obj.imgUrl
   * @param {Date} obj.createdAt
   */
  constructor ({ scOrderId, orderStatus, scCardId, scText, scNote, imgUrl, createdAt }) {
    this.scOrderId = scOrderId
    this.orderStatus = orderStatus
    this.scCardId = scCardId
    this.scText = scText
    this.scNote = scNote
    this.imgUrl = imgUrl
    this.createdAt = new Date(createdAt)
  }
}

ScOrder.ORDER_STATUS = ORDER_STATUS

module.exports = ScOrder
