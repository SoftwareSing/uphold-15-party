const { webPageHeadFilePath } = require('~config/webFilePath')
const HttpError = require('~common/error/HttpError')
const ScOrderRepo = require('~entity/scOrder/ScOrderRepo')

require('svelte/register')
const PageHead = require(webPageHeadFilePath).default

exports.scTrackOrderPageHead = async function ({ scOrderId }) {
  const order = await ScOrderRepo.getByOrderId(scOrderId)
  if (!order) throw new HttpError(301, '/sc/track')

  const { head } = PageHead.render({
    title: 'SC進度追蹤',
    description: `SC進度追蹤 - 訂單編號 ${scOrderId}`,
    image: order.imgUrl
  })
  return head
}
