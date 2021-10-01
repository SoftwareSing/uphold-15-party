const { webPageHeadFilePath } = require('~config/webFilePath')

require('svelte/register')
const PageHead = require(webPageHeadFilePath).default

exports.normalPageHead = function ({ title = '', description = '', image = '' } = {}) {
  const { head } = PageHead.render({ title, description, image })
  return head
}
