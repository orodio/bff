var TOKEN  = new RegExp(/^\w*\{\s*(\w+)\s*\}\w*$/, "g")
var NUMBER = new RegExp(/^[0-9]+$/)

module.exports = function cursor (path, tokens) {
  path   = path || ""
  tokens = tokens || {}

  path = Array.isArray(path)
    ? path
    : path.split("|")

  return path.map(function (part) {
    part = !TOKEN.test(part)
      ? part
      : part.replace(TOKEN, function (match, group) { return tokens[group] })

    part = !NUMBER.test(part)
      ? part
      : parseInt(part, 10)

    return part
  })
}
