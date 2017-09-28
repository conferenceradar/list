var fs = require('fs-extra');
var path = require('path');
var moment = require('moment');
var readDirR = require('./utils/directoryUtils').readDirR;
var getFolderName = require('./utils/dateUtils').getFolderName;

var eventsDir = './src/events';

function evaluateFile(file) {
  if (file.endsWith('.DS_Store')) {
    return;
  }

  const event = require(`../${file}`);

  const eventDate = moment(event.eventStartDate);
  const dateString = eventDate.isValid() ? eventDate.format('YYYY') : undefined;
  const yearFolderName = getFolderName(dateString);
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
