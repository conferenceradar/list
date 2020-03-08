var fs = require("fs-extra");
var eventsDir = "src/events";
var axios = require("axios");
var readDirR = require("./utils/directoryUtils").readDirR;
var getFolderNameFromDate = require("./utils/dateUtils").getFolderNameFromDate;
var moment = require("moment");

var archiveWebPath = "/events/";
var archiveOutputPath = "public/events/";
var srcPath = "src/data/";

function writeObjectToFile(obj, fileName) {
  fs.ensureFileSync(fileName);
  var stream = fs.createWriteStream(fileName);
  stream.once("open", function(fd) {
    stream.write(JSON.stringify(obj, null, "  "));
    stream.end();
  });
}
const API_URL = "https://us-central1-conferenceradar-9e1e2.cloudfunctions.net";

async function getEvents() {
  return await axios.post(`${API_URL}/getEvents`);
}

getEvents().then(({ data }) => {
  const output = Object.keys(data)
    .map(key => data[key])
    .sort((a, b) => new Date(a.eventStartDate) - new Date(b.eventStartDate));
  writeObjectToFile(output, `${srcPath}events.json`);
});
