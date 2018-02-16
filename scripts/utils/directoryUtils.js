var fs = require('fs');
var path = require('path');

var exports = module.exports = {};

// based on https://gist.github.com/kethinov/6658166#gistcomment-2109513
exports.readDirR = function readDirR(dir, transformer) {
  return fs.statSync(dir).isDirectory()
      ? Array.prototype.concat(...fs.readdirSync(dir).map(f => readDirR(path.join(dir, f), transformer)))
      : transformer(dir);
}
