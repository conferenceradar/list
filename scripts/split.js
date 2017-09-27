var events = require('../src/events.json');
var fs = require('fs');
var moment = require('moment');

events.forEach(event => {
  console.log('event', event.name);

  const eventDate = moment(event.eventStartDate);
  const dateString = eventDate.isValid() ? eventDate.format('YYYY-MMMM') : 'unknown-start';
  const countryString = event.country || 'unknown-country';
  const stateProvinceString = event.stateProvince || 'unknown-stateProvince';
  const cityString = event.city || 'unknown-city';

  const eventFileName = `../events/${dateString}-${countryString}-${stateProvinceString}-${cityString}-${event.name}.json`;
  var stream = fs.createWriteStream(eventFileName);
  stream.once('open', function(fd) {
    stream.write(JSON.stringify(event));
    stream.end();
  });
});
