var update = require("./update")

module.exports = function set (path, value, datum) {
  return update(path, function () { return value }, datum)
}
