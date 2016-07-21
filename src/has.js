module.exports = function has (path, datum) {
  path = path || []

  while (true) {
    if (datum === undefined) return false
    if (path.length <= 0)    return true
    datum = datum[path.shift()]
  }
}
