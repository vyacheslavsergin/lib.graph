const path = require('path')

module.exports.getAll = async function (req, res) {
  try {
    setTimeout(() => {
      res
      .status(200)
      .header('Content-Type', 'application/json')
      .sendFile(path.join(__dirname, '../', 'jsons', 'product.json'))
    }, 300)
  } catch (e) {
    errorHandler(res, e)
  }
}
