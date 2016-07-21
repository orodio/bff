var test = require("tape")
var has  = require("./has")

var obj = {
  foo: "a",
  bar: "b",
  num: 5,
  baz: { foo:"c" },
  arr: [
    { foo:"d", bar:"e" },
    { foo:"f", bar:"g" },
  ]
}

test("has", function (t) {
  var tests = [
    [["foo"],             true],
    [["bar"],             true],
    [["num"],             true],
    [["baz"],             true],
    [["nup"],             false],
    [["baz", "foo"],      true],
    [["arr"],             true],
    [["arr", 0],          true],
    [["arr", 1],          true],
    [["arr", 2],          false],
    [["arr", 0, "foo"],   true],
    [["arr", 0, "bar"],   true],
    [["arr", 1, "foo"],   true],
    [["arr", 1, "bar"],   true],
    [["arr", 2, "foo"],   false],
    [["arr", 2, "bar"],   false],
  ]

  t.plan(tests.length)

  tests.forEach(function (d) {
    var def = d[0].join("|")
    t.same(has(d[0], obj), d[1], def)
  })
})
