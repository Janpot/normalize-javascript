var babylon = require('babylon');
var generate = require('babel-generator')['default'];
var traverse = require('babel-traverse')['default'];

var VISITED = Symbol();

function normalize (code, options) {
  code = code.replace(/\n+/g, '\n');
  var ast = babylon.parse(code, options);
  traverse(ast, {
    Identifier (path) {
      if (path.scope[VISITED]) return;
      path.scope[VISITED] = true;
      Object.keys(path.scope.bindings)
        .forEach(identifier => {
          var ref = path.scope.generateUid('ref');
          path.scope.rename(identifier, ref);
        });
    }
  });
  return generate(ast).code;
}

module.exports = normalize;
