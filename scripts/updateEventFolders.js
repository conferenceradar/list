var fs = require('fs-extra');
var path = require('path');
var readDirR = require('./utils/directoryUtils').readDirR;
var getFolderNameFromDate = require('./utils/dateUtils').getFolderNameFromDate;

var eventsDir = './src/events';

function evaluateFile(file) {
  if (file.endsWith('.DS_Store')) {
    return;
  }

  const event = require(`../${file}`);
  const yearFolderName = getFolderNameFromDate(event.eventStartDate);
  const eventPath = `./src/events/${yearFolderName}/${file.split(/[/]+/).pop()}`;

  fs.unlinkSync(`${file}`);
  fs.ensureFileSync(eventPath);
  var stream = fs.createWriteStream(eventPath);
  stream.once('open', function(fd) {
    stream.write(JSON.stringify(event, null, '  '));
    stream.end();
  });

}

readDirR(eventsDir, evaluateFile);
