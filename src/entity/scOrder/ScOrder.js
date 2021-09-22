module.exports = class ScOrder {
  /**
   * @param {Object} obj
   * @param {String} obj.scOrderId
   * @param {String} obj.scCardId
   * @param {String} obj.scText
   * @param {String} obj.scNote
   */
  constructor ({ scOrderId, scCardId, scText, scNote }) {
    this.scOrderId = scOrderId
    this.scCardId = scCardId
    this.scText = scText
    this.scNote = scNote
  }
}
