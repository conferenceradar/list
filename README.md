## Conference Radar

This project was created with the goal of maintaining a community list of tech conferences.

## How to help

If you see any errors, have an event to add, or add detail to an event that is currently listed, please file an issue or pull request.

### Add Details

The longer term goal is to be able to:

* List events that are upcoming only
* List events that have Open CFPs
* List events within {some number} of miles of a given location

This should all be possible (with varying degrees of difficulty) but will need more data from the community. This application is currently based on a json file containing conference information.

```
  {
    "name": "{{CONFERENCE NAME}}",
    "topic": "",
    "url": "{{CONFERENCE URL}}",
    "twitter": "",
    "city": "New York",
    "stateProvince": "NY",
    "country": "United States",
    "eventStartDate": "",
    "eventEndDate": "",
    "cfpStartDate": "",
    "cfpEndDate": "",
    "codeOfConduct": "",
    "latitude": 40.7127837,
    "longitude": -74.0059413
  },
```

The main fields right now are: 

* **name**: Name of the conference
* **url**: The conference website
* **twitter**: The conference twitter handle or hashtag if no profile exists
* **city**: City
* **stateProvince**: State/Province (can be empty)
* **country**: Country
* **eventStartDate**: The Date/DateTime that this event starts (currently all dates are local — The longer term goal is for these to be UTC)
* **eventStartDate**: The Date/DateTime that this event ends
* **cfpStartDate**: The Date/DateTime that the CFP for this event starts
* **cfpEndDate**: The Date/DateTime that the CFP for this event ends
* **codeOfConduct**: Right now, this is a string for determining if an event has a code of conduct. (Perhaps switch this to a URL?)
* **latitude**: Latitude based on the event location information
* **longitude**: Longitude based on the event location information

#### How to add an Event

The events are sorted Alphabetically by conference name. Add an event that has specified fields and submit a PR :+1:

#### How to obtain Latitude and Longitude of a conference?

See: [Get the coordinates of a place](https://support.google.com/maps/answer/18539) on Google Maps support documentation.

### Don't like editing JSON? 

Totally understandable! If you know of a conference or see anything missing on this list? Submit a GitHub issue using standard text :+1: This will help put this item on the radar of others!
