var cursor = require("./cursor")

module.exports = function get (path, datum) {
  path = path || []

  while (true) {
    if (path.length <= 0)    return datum
    if (datum === undefined) return undefined
    datum = datum[path.shift()]
  }
}
