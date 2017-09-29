var fs = require('fs-extra');
var eventsDir = 'src/events';
var readDirR = require('./utils/directoryUtils').readDirR;
var getFolderNameFromDate = require('./utils/dateUtils').getFolderNameFromDate;
var moment = require('moment');

var archiveWebPath = '/events/';
var archiveOutputPath = 'public/events/'
var srcPath = 'src/data/';

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
  return sortFactory('name')(a, b)
  || sortFactory('location')(a, b)
  || 0;
}

function eventDateSortFunction(a, b) {
  return sortFactory('eventStartDate')(a, b)
    || sortFactory('name')(a, b)
    || sortFactory('location')(a, b)
    || 0;
}

function getEventWithKey(event) {
  // build a really naive key for use with storing events later
  const key = `${event.name}:${Math.round(event.latitude)}:${Math.round(event.longitude)}`;
  return Object.assign({}, event, { key })
}

function buildEventList() {
  var events = {
    upcoming: []
  };

  var yearKeys = [];

  return {
    addEvents: function addFiles(file) {
      // TODO: Abstract this stuff 🙃
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
        events.upcoming.push(getEventWithKey(event));
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

function writeObjectToFile(obj, fileName) {
  fs.ensureFileSync(fileName);
  var stream = fs.createWriteStream(fileName);
  stream.once('open', function(fd) {
    stream.write(JSON.stringify(obj, null, '  '));
    stream.end();
  });

}
function writeFile(key, fileName=null, public=false) {
  var outputFileName = fileName || `${key}.json`;
  var outputFolder = public
    ? archiveOutputPath //'public/events/'
    : srcPath //'src/';

  writeObjectToFile(eventList.getEvents(key), `${outputFolder}${outputFileName}`)
}

function writeArchiveMetadata(yearKeys) {
  // We are looping through yearKeys twice -- here and where we're actually generating the files
  // we're setting this  to only 5 years for now so should not be too bad but 
  // if there is ever a case to add a lot more -- lets do this so we only have to iterate once
  const meta = yearKeys.map(year => {
    return { key: year, path: `${archiveWebPath}${year}.json`}
  })

  writeObjectToFile(meta, `${srcPath}archiveMetadata.json`);
}

const eventList = buildEventList();

readDirR(eventsDir, eventList.addEvents);

writeFile('upcoming', 'events.json');

const yearKeys = eventList.getYearKeys();

yearKeys.forEach(key => {
  writeFile(key, null, true);
});

writeArchiveMetadata(yearKeys);