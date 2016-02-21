var hello = Promise.resolve();
var c = hello
function foo (bar, d) {
  bar = d;
  var baz = bar;
  return function (xyz) {
    return d + baz;
  };
}

function fun (wat) {
  return wat
}
