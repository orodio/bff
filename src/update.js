module.exports = function update (path, updater, datum, undefined_state) {
  datum = Object.assign({}, datum)
  var target = datum

  for (var i = 0; i < path.length - 1; i++) {
    if (target[path[i]] === undefined) target[path[i]] = {}
    target = target[path[i]]
  }

  target[path[i]] = updater(target[path[i]] === undefined ? undefined_state : target[path[i]])

  return datum
}



// var add = (path, value, data) =>
//   update(path, old => (old.add(value), old), data, new Set())

// var remove = (path, value, data) =>
//   update(path, old => (old.remove(value), old), data, new Set())

// var push = (path, value, data) =>
//   update(path, old => (old.push(value), old), data, [])





