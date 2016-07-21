var test = require("tape")
var set  = require("./set")

test("set", function (t) {
  var tests = [
    [["foo"],               5,     {},            { foo:5 }],
    [["bar"],               6,     { foo:5 },     { foo:5, bar:6 }],
    [["foo", "bar", "baz"], "omg", { lol:"heh" }, { lol:"heh", foo:{ bar:{ baz:"omg"} }}],
  ]

  t.plan(tests.length * 2)

  tests.forEach(function (d) {
    var path = d[0]
    var valu = d[1]
    var data = d[2]
    var expt = d[3]
    var resl = set(path, valu, data)

    t.notSame(data, resl, "Imutab: " + path.join("|"))
    t.same(expt, resl,    "Result: " + path.join("|"))
  })
})
