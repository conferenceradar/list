var fs = require('fs');
var eventsDir = 'src/events';

function getSafeEventName (name) {
  return name.replace(/\s/g, 'space')
             .replace(/-/g, 'dash')
             .replace(/:/g, 'colon')
             .replace(/@/g, 'at')
             .replace(/\!/g, 'bang')
             .replace(/\//g, 'fwslash')
             .replace(/\\/g, 'bslash')
             .replace(/\(/g, 'parens')
             .replace(/\)/g, 'parens')
             .replace(/&/g, 'and')
             .replace(/\./g, 'dot')
             .replace(/'/g, 'squote')
             .replace(/’/g, 'squote')
             .replace(/"/g, 'dquote')
             .replace(/\?/g, 'question')
             .replace(/\+/g, 'plus');
}

function getLocationString (item) {
  return item.country + '-' + item.stateProvince + '-' + item.city;
}

function eventSortFunction(a, b) {
  var nameA = a.event.name.toUpperCase(); // ignore upper and lowercase
  var nameB = b.event.name.toUpperCase(); // ignore upper and lowercase

  var locationA = getLocationString(a.event);
  var locationB = getLocationString(b.event);

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

fs.readdir(eventsDir, (err, files) => {
  const fileImportMappings = files.map(file => {
    const event = require(`../${eventsDir}/${file}`);
    const importName = `e${getSafeEventName(file)}`;

    return {
      importName,
      event,
      path: `events/${file.replace(/'/g, "\\'")}`,
    };
  });

  const sortedMappings = fileImportMappings.sort(eventSortFunction);

  var stream = fs.createWriteStream("src/conferences.js");
  stream.once('open', function(fd) {
    stream.write(sortedMappings.reduce((importStatements, event) => {
      return `${importStatements}import ${event.importName} from './${event.path}';\n`
    }, ''));
    stream.write(sortedMappings.reduce((exportStatement, event, i) => {
      const lastItem = sortedMappings.length === i + 1;
      return `${exportStatement}${event.importName}${lastItem ? '];' : ','}`;
    }, '\n\nexport default ['));
    stream.end();
  });
})
