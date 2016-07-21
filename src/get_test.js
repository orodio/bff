var test = require("tape")
var get  = require("./get")

var obj = {
  foo: "a",
  bar: "b",
  baz: { foo:"c" },
  num: 5,
  arr: [
    { foo:"d", bar:"e" },
    { foo:"f", bar:"g" },
  ]
}

test("get", function (t) {
  var tests = [
    [["foo"],             obj.foo],
    [["bar"],             obj.bar],
    [["num"],             obj.num],
    [["baz"],             obj.baz],
    [["nup"],             undefined],
    [["baz", "foo"],      obj.baz.foo],
    [["arr"],             obj.arr],
    [["arr", 0],          obj.arr[0]],
    [["arr", 1],          obj.arr[1]],
    [["arr", 2],          undefined],
    [["arr", 0, "foo"],   obj.arr[0].foo],
    [["arr", 0, "bar"],   obj.arr[0].bar],
    [["arr", 1, "foo"],   obj.arr[1].foo],
    [["arr", 1, "bar"],   obj.arr[1].bar],
    [["arr", 2, "foo"],   undefined],
    [["arr", 2, "bar"],   undefined],
  ]

  t.plan(tests.length)

  tests.forEach(function (d) {
    var def = d[0].join("|")
    t.same(get(d[0], obj), d[1], def)
  })
})
