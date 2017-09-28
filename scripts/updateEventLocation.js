var fs = require('fs-extra');
var path = require('path');
var moment = require('moment');
var readDirR = require('./utils/directoryUtils').readDirR;
var eventsDir = './src/events';
var archiveLength = 5;

function getYearNumber(yearString) {
  return isNaN(yearString) ?
    1 :
    parseInt(yearString, 10);
}

// If item belongs in archive folder
function isArchive(yearNumber) {
  return (((new Date()).getFullYear() - yearNumber) > archiveLength);
}

// This script moves events from the root events folder into a 
// folder by year -- or archive for events that are more
// than 5 years old (or unknown)
function getFolderName(year) {
  const yearNumber = getYearNumber(year);

  if(isArchive(yearNumber)) {
    return 'archive';
  }

  return yearNumber;
}

function evaluateFile(file) {
  if (file.endsWith('.DS_Store')) {
    return;
  }

  const event = require(`../${file}`);

  const eventDate = moment(event.eventStartDate);
  const dateString = eventDate.isValid() ? eventDate.format('YYYY') : undefined;
  const yearFolderName = getFolderName(dateString);
  const eventPath = `./src/events/${yearFolderName}/${file.split(/[/]+/).pop()}`;

  fs.ensureFileSync(eventPath);
  var stream = fs.createWriteStream(eventPath);
  stream.once('open', function(fd) {
    stream.write(JSON.stringify(event, null, '  '));
    stream.end();
  });

  fs.unlink(`${file}`);
}

readDirR(eventsDir, evaluateFile);

// fs.readdir(eventsDir, (err, files) => {
//   const fileImportMappings = files.map(file => {
//     const event = require(`../${eventsDir}/${file}`);

//     var stream = fs.createWriteStream(`../${eventsDir}/`);

//   });

//   const sortedMappings = fileImportMappings.sort(eventSortFunction);

//   var stream = fs.createWriteStream("src/conferences.js");
//   stream.once('open', function(fd) {
//     stream.write(sortedMappings.reduce((importStatements, event) => {
//       return `${importStatements}import ${event.importName} from './${event.path}';\n`
//     }, ''));
//     stream.write(sortedMappings.reduce((exportStatement, event, i) => {
//       const lastItem = sortedMappings.length === i + 1;
//       return `${exportStatement}${event.importName}${lastItem ? '];' : ','}`;
//     }, '\n\nexport default ['));
//     stream.end();
//   });
// })