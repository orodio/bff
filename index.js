var cursor = require("./src/cursor")
var has    = require("./src/has")
var get    = require("./src/get")
var set    = require("./src/set")
var update = require("./src/update")

function guid () {
  return ((+ new Date()) + (Math.random() * 999999 |0)).toString(36)
}

function Store () {
  this.subs  = {}
  this.state = {}
}

Store.prototype = {
  emit: function (path) {
    var paths = new Set()

    while (true) {
      if (path.length <= 0) break
      paths.add(path.join("|"))
      path.pop()
    }

    Object.keys(this.subs).forEach(function (key) {
      return fn[key](paths)
    })

    return this
  },

  on: function (paths, fn) {
    var key = guid()
    this.subs[key] = function (pxs) { for (var path of paths) if (pxs.has(path)) return fn() }
    return function () { delete this.subs[key] }
  },

  cursor: function (path, tokens) {
    return cursor(path, tokens || {})
  },

  has: function (path) {
    path = this.cursor(path)
    return has(path, this.state)
  },

  get: function (path, tokens) {
    path = this.cursor(path, tokens)
    return get(path, this.state)
  },

  set: function (path, value) {
    path = this.cursor(path)
    this.state = set(path, value, this.state)
    return this.emit(path)
  },

  update: function (path, fn, base_value) {
    path = this.cursor(path)
    this.state = update(path, fn, this.state, base_value)
    return this.emit(path)
  },

  guid: guid,
}

module.exports = new Store()
