const { nativeImage } = require('electron').remote

module.exports = {
  generate(input) {
    var QRCode = require('qrcode')
    return QRCode.toDataURL(input.value).then(url => {
      return cc.images.add(nativeImage.createFromDataURL(url)).then(image => {
        return { type: 'image', value: image }
      })
    })
  },
  decode(input) {
    var jsQR = require('jsqr')
    var path = cc.images.getRawImagePath(input.value)
    var image = nativeImage.createFromPath(path)
    var {width, height} = image.getSize()
    var data = image.getBitmap()
    var code = jsQR(data, width, height)
    if (code) {
      return { type: 'text', value: code.data }
    } else {
      throw new Error('未检测到二维码')
    }
  }
}
