var markDownImageSize = require('markdown-image-size')
var nps = require('path')

function opts(options) {
  var settings = options || {}
  return Object.assign({
    devEnable: false,
    debug: false,
    source: '',
    ignoreRelative: false
  }, settings)
}

exports.markdownTransformer = function(options, gift) {
  var filename = gift.filesMap[gift.path]

  options = opts(options)
  if (options.devEnable || process.env.NODE_ENV === 'production') {
    try {
      return markDownImageSize(gift.data, {
        source: nps.dirname(filename),
        log: options.debug,
        ignoreRelative: options.ignoreRelative
      })
    } catch (_) {
      console.error('image-size', _)
      return gift.data
    }
  }
  return gift.data
}
