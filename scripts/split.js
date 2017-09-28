var events = require('../src/events.json');
var fs = require('fs');
var moment = require('moment');
var sanitize = require("sanitize-filename");

events.forEach(event => {
  const eventDate = moment(event.eventStartDate);
  const dateString = sanitize(eventDate.isValid() ? eventDate.format('YYYY-MMMM') : 'unknown-start');
  const countryString = sanitize(event.country || 'unknown-country');
  const stateProvinceString = sanitize(event.stateProvince || 'unknown-stateProvince');
  const cityString = sanitize(event.city || 'unknown-city');
  const nameString = sanitize(event.name);

  const eventFileName = `src/events/${dateString}-${countryString}-${stateProvinceString}-${cityString}-${nameString}.json`;
  var stream = fs.createWriteStream(eventFileName);
  stream.once('open', function(fd) {
    stream.write(JSON.stringify(event));
    stream.end();
  });
});
