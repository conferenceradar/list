var events = require('../src/events.json');
var fs = require('fs')

events.sort(function(a, b) {
  var nameA = a.name.toUpperCase(); // ignore upper and lowercase
  var nameB = b.name.toUpperCase(); // ignore upper and lowercase
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }

  // names must be equal
  return 0;
});

var stream = fs.createWriteStream("newEvents.json");
stream.once('open', function(fd) {
  stream.write(JSON.stringify(events));
  stream.end();
});