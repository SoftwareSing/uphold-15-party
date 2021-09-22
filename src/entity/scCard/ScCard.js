const argon2 = require('argon2')

module.exports = class ScCard {
  /**
   * @param {Object} obj
   * @param {String} obj.scCardId
   * @param {String} obj.scCardNo
   * @param {String} obj.goodThru
   * @param {String} obj.code
   * @param {String} obj.passwordArgon2
   */
  constructor ({ scCardId, scCardNo, goodThru, code, passwordArgon2 }) {
    this.scCardId = scCardId
    this.scCardNo = scCardNo
    this.goodThru = goodThru
    this.code = code
    this.passwordArgon2 = passwordArgon2
  }

  static hashPasswordByArgon2 (password) {
    return argon2.hash(password)
  }

  verifyPassword (password) {
    const { passwordArgon2 } = this
    return passwordArgon2 !== ''
      ? argon2.verify(passwordArgon2, password)
      : Promise.resolve(false)
  }

  async verifyCard ({ cardNo, goodThru, code, password }) {
    return cardNo === this.scCardNo &&
      goodThru === this.goodThru &&
      code === this.code &&
      await this.verifyPassword(password)
  }
}
