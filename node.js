
var markDownImageSize = require('markdown-image-size')

function opts(options) {
  var settings = options || {}
  return Object.assign({
    devEnable: false,
    debug: true,
    source: '',
    ignoreRelative: false
  }, settings)
}



exports.markdownTransformer = function(options, gift) {
  options = opts(options)
  if (options.devEnable || process.env.NODE_ENV === 'production') {
    try {
      return markDownImageSize(gift.data, {
        source: options.source,
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