const HttpError = require('~common/error/HttpError')
const ScCardRepo = require('~entity/scCard/ScCardRepo')
const ScOrderRepo = require('~entity/scOrder/ScOrderRepo')

exports.orderSc = async function ({ scCardNo, goodThru, code, password, scText, scNote }) {
  for (const param of [scCardNo, goodThru, code, password, scText, scNote]) {
    if (typeof param !== 'string') throw new HttpError(400, '請再次確認輸入內容')
  }

  const card = await ScCardRepo.getByScCardNo(scCardNo)
  if (!card || !await card.verifyCard({ cardNo: scCardNo, goodThru, code, password })) {
    throw new HttpError(403, 'SC卡驗證失敗，請確認輸入的卡片資訊是否正確')
  }

  const order = await ScOrderRepo.order({
    scCardId: card.scCardId,
    scText,
    scNote
  })

  return {
    scOrderId: order.scOrderId,
    scText: order.scText,
    scNote: order.scNote
  }
}
