var events = require('../src/events.json');
var fs = require('fs')

function getLocationString (item) {
  return item.country + '-' + item.stateProvince + '-' + item.city;
}

events.sort(function(a, b) {
  var nameA = a.name.toUpperCase(); // ignore upper and lowercase
  var nameB = b.name.toUpperCase(); // ignore upper and lowercase

  var locationA = getLocationString(a);
  var locationB = getLocationString(b);

  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }

  //items have same name but check location
  if (locationA < locationB) {
    return -1;
  }
  if (locationA > locationB) {
    return 1
  }

  // names must be equal
  return 0;
});

var stream = fs.createWriteStream("newEvents.json");
stream.once('open', function(fd) {
  stream.write(JSON.stringify(events, null, '  '));
  stream.end();
});