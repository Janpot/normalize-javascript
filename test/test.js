var normalizeJs = require('..');
var assert = require('chai').assert;
var fs = require('fs');
var path = require('path');

var fixtureFolders = fs.readdirSync(path.resolve(__dirname, 'fixtures'));

describe('normalize-javascript', () => {
  fixtureFolders.forEach(folderName => {
    describe(folderName, () => {
      var scriptNames = fs.readdirSync(path.resolve(__dirname, `fixtures/${folderName}`));
      var scripts = scriptNames.map(scriptName => {
        return {
          name: scriptName,
          content: fs.readFileSync(path.resolve(__dirname, `fixtures/${folderName}/${scriptName}`), {
            encoding: 'utf-8'
          })
        };
      });

      scripts.slice(1)
        .forEach(script => {
          it(`compare ${scripts[0].name} with ${script.name}`, () => {
            var norm1 = normalizeJs(scripts[0].content);
            var norm2 = normalizeJs(script.content);
            assert.strictEqual(norm1, norm2);
          });
        });
    });
  });
});
