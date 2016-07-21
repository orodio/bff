var test = require("tape")
var fn   = require("./cursor")

var ts = {
  foo:"a",
  bar:"b",
  baz:"c",
  n1: 5,
  n2: "5",
}

test("cursor", function (t) {
  var tests = [
    ["foo",         ["foo"]],
    ["foo|bar",     ["foo", "bar"]],
    ["foo|bar|baz", ["foo", "bar", "baz"]],

    ["{foo}", ["a"]],
    ["{bar}", ["b"]],
    ["{n1}",  [5]],
    ["{n2}",  [5]],

    ["{ foo }", ["a"]],
    ["{ bar }", ["b"]],
    ["{ n1 }",  [5]],
    ["{ n2 }",  [5]],

    ["{foo}|{n1}|{bar}|omg",     ["a", 5, "b", "omg"]],
    ["{ foo }|{n1}|{ bar }|omg", ["a", 5, "b", "omg"]],
  ]

  t.plan(tests.length)

  tests.forEach(function (d) {
    t.same(fn(d[0], ts), d[1], d[0])
  })
})
