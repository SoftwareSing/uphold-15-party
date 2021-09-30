const path = require('path')

const webDirPath = path.resolve(__dirname, '..', 'uphold-15-party-web')
const webPublicDirPath = path.resolve(webDirPath, 'public')

module.exports = {
  webPublicDirPath,
  webIndexFilePath: path.resolve(webPublicDirPath, 'index.html'),
  webPageHeadFilePath: path.resolve(webDirPath, 'src', 'PageHead.svelte')
}
