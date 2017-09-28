var archiveLength = 5;

var exports = module.exports = {};

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
exports.getFolderName = function getFolderName(year) {
  const yearNumber = getYearNumber(year);

  if(isArchive(yearNumber)) {
    return 'archive';
  }

  return yearNumber;
}
