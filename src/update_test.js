var test   = require("tape")
var update = require("./update")

test("update", function (t) {
  var tests = [
    [["foo"], d => 5,     {},        0, { foo:5 }],
    [["bar"], d => d + 1, { bar:5 }, 0, { bar:6 }],

    [["foo", "bar", "baz"], d => d - 1, {}, 10, { foo:{ bar:{ baz:9 }} }],

    [["bob"], d => (d.add("bob"), d), {}, new Set(), { bob: new Set(["bob"]) }]
  ]

  t.plan(tests.length * 2)

  tests.forEach(function (d) {
    var path = d[0]
    var func = d[1]
    var data = d[2]
    var defa = d[3]
    var expt = d[4]
    var resl = update(path, func, data, defa)

    t.notSame(data, resl, "Imutab: " + path.join("|"))
    t.same(expt, resl,    "Result: " + path.join("|"))
  })

  t.end()
})
