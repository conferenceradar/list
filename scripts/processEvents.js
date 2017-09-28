var fs = require('fs');
var eventsDir = 'src/events';
var readDirR = require('./utils/directoryUtils').readDirR;

function getLocationString (item) {
  return item.country + '-' + item.stateProvince + '-' + item.city;
}

function eventSortFunction(a, b) {
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
}

function buildEventList() {
  var events = [];

  return {
    addEvents: function addFiles(file) {
      if (file.endsWith('.DS_Store')) {
        return;
      }

      events.push(require(`../${file}`));
    }, 
    getEvents: function getFiles() {
      return events.sort(eventSortFunction);
    }
  }
}

const eventList = buildEventList();

readDirR(eventsDir, eventList.addEvents);

var stream = fs.createWriteStream("src/events.json");
stream.once('open', function(fd) {
  stream.write(JSON.stringify(eventList.getEvents(), null, '  '));
  stream.end();
});