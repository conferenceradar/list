var fs = require('fs');
var eventsDir = 'src/events';
var readDirR = require('./utils/directoryUtils').readDirR;
var getFolderNameFromDate = require('./utils/dateUtils').getFolderNameFromDate;
var moment = require('moment');

function getLocationString (item) {
  return item.country + '-' + item.stateProvince + '-' + item.city;
}

function sortFactory(key) {
  return function eventSortFunction(a, b) {
    var fieldA = a[key] && a[key].toUpperCase
      ? a[key].toUpperCase()
      : a[key];

    var fieldB = b[key] && b[key].toUpperCase
      ? b[key].toUpperCase()
      : b[key];

    if (fieldA < fieldB) {
      return -1;
    }
    if (fieldA > fieldB) {
      return 1;
    }

    // names must be equal
    return undefined;
  }
}

function standardSortFunction(a, b) {
  return sortFactory('name')(a, b) ||
  sortFactory('location')(a, b) ||
  0;
}

function eventDateSortFunction(a, b) {
  return sortFactory('eventStartDate')(a, b)
    || sortFactory('name')(a, b)
    || sortFactory('location')(a, b)
    || 0;
}

function buildEventList() {
  var events = {
    upcoming: []
  };

  var yearKeys = [];

  return {
    addEvents: function addFiles(file) {
      if (file.endsWith('.DS_Store')) {
        return;
      }

      const event = require(`../${file}`);

      // get the year key
      const key = getFolderNameFromDate(event.eventStartDate);

      // ensure that this key lives in the events object
      if (!events.hasOwnProperty(key)) {
        events[key] = [];
        yearKeys.push(key);
      }

      // push item into the array
      events[key].push(event)

      // push to upcoming if startDate is > today
      if (event.eventStartDate && event.eventStartDate > moment().toISOString()) {
        events.upcoming.push(event);
      }
    }, 
    getEvents: function getFiles(key) {
      return events[key] && events[key].sort(eventDateSortFunction);
    },
    getYearKeys: function getKeys() {
      return yearKeys;
    }
  }
}

function writeFile(key, fileName=null, public=false) {
  var outputFileName = fileName || `${key}.json`;
  var outputFolder = public
    ? 'public/events/'
    : 'src/';

  var stream = fs.createWriteStream(`${outputFolder}${outputFileName}`);
  stream.once('open', function(fd) {
    stream.write(JSON.stringify(eventList.getEvents(key), null, '  '));
    stream.end();
  });
}

const eventList = buildEventList();

readDirR(eventsDir, eventList.addEvents);

writeFile('upcoming', 'events.json');

eventList.getYearKeys().forEach(key => {
  writeFile(key, null, true);
});