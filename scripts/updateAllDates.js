var fs = require('fs');
var events = require('../src/events.json');
var moment = require('moment');

const getDateOrEmpty = (date) => {
  return date ?
    moment(date).toISOString() :
    '';
};

const updatedEvents = events.map(event => {
  const dateObject = {
    eventStartDate: getDateOrEmpty(event.eventStartDate),
    eventEndDate: getDateOrEmpty(event.eventEndDate),
    cfpStartDate: getDateOrEmpty(event.cfpStartDate),
    cfpEndDate: getDateOrEmpty(event.cfpEndDate)
  }

  return Object.assign({}, event, dateObject);
});

var stream = fs.createWriteStream("newEvents.json");
stream.once('open', function(fd) {
  stream.write(JSON.stringify(updatedEvents));
  stream.end();
});